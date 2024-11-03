import React, { ComponentRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { ControlledTextInputBase } from './ControlledTextInputBase'

export const ControlledTextInput = React.forwardRef<TextInput, TextInputProps>(
  (props, forwardedRef) => {
    return <ControlledTextInputBase {...props} forwardedRef={forwardedRef} />
  },
)

ControlledTextInput.displayName = 'ControlledTextInput'

export type ControlledTextInput = ComponentRef<typeof ControlledTextInput>
