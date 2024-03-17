import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Register from './register'
import Login from './login'
import { Text, View } from 'react-native'

const Stack = createNativeStackNavigator()

function UnauthNavigator() {
  console.log('NOT AUTH NAVIGATOR')
  return (
    <View>
      <Text style={{ fontSize: 40 }}>X</Text>
      <Stack.Navigator>
        <Stack.Screen name="Detail" component={Login} />
        <Stack.Screen name="Home" component={Register} />
      </Stack.Navigator>

      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator> */}
    </View>
  )
}

export default UnauthNavigator
