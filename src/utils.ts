export const partitionCallbackProps = <T extends object>(props: T) => {
  const regularProps = {} as T
  const callbackProps = {} as CallbackPropsOf<T>
  Object.keys(props).forEach((key) => {
    if (typeof props[key] === 'function' && key.match(/^on[A-Z]/)) {
      callbackProps[key] = props[key]
    } else {
      regularProps[key] = props[key]
    }
  })

  return { regularProps, callbackProps }
}

/* eslint-disable prettier/prettier, @typescript-eslint/no-unsafe-function-type */
export type CallbackPropsOf<T extends object> = {
  [
    K in keyof T // filter keys of T on conditions A and B
      as T[K] extends Function // condition A: value is a function
        ? K extends `on${Uppercase<string>}${string}` // condition B: key is string that matches /^on[A-Z]/
          ? K // if A && B: include key
          : never // if !B: remove key
        : never // if !A: remove key
  ]: T[K] // map filtered keys to their respective values
}
/* eslint-enable */
