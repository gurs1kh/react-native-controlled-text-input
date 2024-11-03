import { registerRootComponent } from 'expo'
import { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { ControlledTextInput } from 'react-native-controlled-text-input'

const App = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="React Native TextInput"
        onChangeText={(text) => setValue1(text)}
        value={value1}
      />
      <ControlledTextInput
        style={styles.textInput}
        placeholder="ControlledTextInput"
        onChangeText={(text) => setValue2(text)}
        value={value2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
    rowGap: 20,
  },
  textInput: {
    fontSize: 20,
  },
})

export default registerRootComponent(App)
