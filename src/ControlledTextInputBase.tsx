import React, { createRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { shallowEqualObjects } from 'shallow-equal'

type TextSelection = TextInputProps['selection']

type ControlledTextInputProps = TextInputProps & {
  forwardedRef?: React.ForwardedRef<TextInput>
}

export class ControlledTextInputBase extends React.Component<ControlledTextInputProps> {
  inputRef: React.MutableRefObject<TextInput | null>
  textRef: string
  selectionRef: TextSelection

  pendingTextChanges = 0
  pendingSelectionChanges = 0

  callbackProps: Partial<TextInputProps> = {
    onChange: (e) => {
      this.pendingTextChanges++
      this.textRef = e.nativeEvent.text
      this.props.onChange?.(e)
    },
    onSelectionChange: (e) => {
      this.pendingSelectionChanges++
      this.selectionRef = e.nativeEvent.selection
      this.props.onSelectionChange?.(e)
    },
  }

  constructor(props: ControlledTextInputProps) {
    super(props)
    const { callbackProps } = partitionCallbackProps(props)

    this.assignCallbackProps(callbackProps)
    this.inputRef = createRef<TextInput>()

    const { value, defaultValue, selection } = this.props
    this.textRef = value ?? defaultValue ?? ''
    this.selectionRef = selection ?? { start: 0, end: 0 }
  }

  assignCallbackProps = (callbackProps: TextInputProps) => {
    let hasChange = false
    const callbackKeys = Object.keys(callbackProps) as (keyof TextInputProps)[]

    callbackKeys.forEach((key) => {
      if (this.callbackProps[key]) return

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.callbackProps[key] = callbackProps[key]
      hasChange = true
    })
    return hasChange
  }

  assignText = (text?: string) => {
    if (0 < this.pendingTextChanges) {
      this.pendingTextChanges--
    } else if (this.textRef !== text && typeof text === 'string') {
      this.textRef = text
      const start = text.length
      this.selectionRef = { start, end: start }
      this.inputRef.current?.setNativeProps({ text, selection: { start } })
    }
  }

  assignSelection = (selection: TextSelection) => {
    if (0 < this.pendingSelectionChanges) {
      this.pendingSelectionChanges--
    } else if (selection && !shallowEqualObjects(this.selectionRef, selection)) {
      this.selectionRef = selection
      this.inputRef.current?.setNativeProps({ selection })
    }
  }

  passedProps = () => {
    const { regularProps } = partitionCallbackProps(this.props)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, selection, forwardedRef, ...passedProps } = regularProps
    return passedProps
  }

  hasPassedPropChanges = (newPassedProps: TextInputProps) => {
    return !shallowEqualObjects(this.passedProps(), newPassedProps)
  }

  shouldComponentUpdate = (nextProps: TextInputProps): boolean => {
    const { regularProps, callbackProps } = partitionCallbackProps(nextProps)
    const { value, selection, ...otherProps } = regularProps
    this.assignText(value)
    this.assignSelection(selection)

    const hasCallbackChanges = this.assignCallbackProps(callbackProps)
    return hasCallbackChanges || this.hasPassedPropChanges(otherProps)
  }

  handleRef = (ref: TextInput) => {
    if (!ref) return
    const { forwardedRef } = this.props

    if (typeof forwardedRef === 'object' && forwardedRef !== null) {
      forwardedRef.current = ref
    } else if (typeof forwardedRef === 'function') {
      forwardedRef(ref)
    }

    this.inputRef.current = ref
  }

  render() {
    return <TextInput ref={this.handleRef} {...this.passedProps()} {...this.callbackProps} />
  }
}

const partitionCallbackProps = <T extends object>(props: T) => {
  const regularProps = {} as T
  const callbackProps = {} as T
  Object.keys(props).forEach((key) => {
    if (typeof props[key] === 'function' && key.match(/on[A-Z]/)) {
      callbackProps[key] = props[key]
    } else {
      regularProps[key] = props[key]
    }
  })

  return { regularProps, callbackProps }
}