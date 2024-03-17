import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './home'
import Detail from './detail'

const Stack = createNativeStackNavigator()

function AuthNavigator() {
  console.log('AUTH NAVIGATOR')
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Detail} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
