# react-native-controlled-text-input
[![npm version](https://badge.fury.io/js/react-native-controlled-text-input.svg)](https://badge.fury.io/js/react-native-controlled-text-input)

A performant controlled text input for React Native

As laid out in https://github.com/facebook/react-native-website/pull/4247, controlled inputs are broken when using React Native's `TextInput` component. `react-native-controlled-text-input` addresses that issue and works as a drop in replacement.

<table>
  <tr>
    <th>RN TextInput</th>
    <th>ControlledTextInput</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/gurs1kh/react-native-controlled-text-input/raw/refs/heads/master/.github/assets/rn-text-input.gif" width="350"/>
    </td>
    <td>
      <image src="https://github.com/gurs1kh/react-native-controlled-text-input/raw/refs/heads/master/.github/assets/controlled-text-input.gif" width="350" />
    </td>
  </tr>
</table>

## Installation

#### npm
```sh
npm install react-native-controlled-text-input
```

#### yarn
```sh
yarn add react-native-controlled-text-input
```

## Usage

`react-native-controlled-text-input` is a drop-in replacement for React Native's `TextInput` component:
```diff
import { useState } from 'react';
- import { TextInput } from 'react-native'
+ import { TextInput } from 'react-native-controlled-text-input'

let App = () => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      style={{ marginTop: 200, padding: 100, fontSize: 20 }}
      placeholder="Edit me"
      onChangeText={text => setValue(text)}
      value={value}
    />
  );
};

export default App;
```

For a more explicit import, you can also use:
```diff
- import { TextInput } from 'react-native'
+ import { ControlledTextInput } from 'react-native-controlled-text-input'

let App = () => {
  const [value, setValue] = useState('');

  return (
-    <TextInput
+    <ControlledTextInput
      style={{ marginTop: 200, padding: 100, fontSize: 20 }}
      placeholder="Edit me"
      onChangeText={text => setValue(text)}
      value={value}
    />
  );
};

export default App;
```

All props and methods are the same as [TextInput](https://reactnative.dev/docs/textinput) 

## License

MIT

## 

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
