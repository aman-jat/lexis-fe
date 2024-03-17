import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './unauth/login'
import Register from './unauth/register'
import Home from './auth/home'
import Detail from './auth/detail'
import { auth } from '../core/api'
import { useAppSelector } from '../core/store/redux-store'

const Stack = createStackNavigator()

const Root = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    const getMe = async () => {
      try {
        await auth.getMe()
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }
    if (!user) {
      getMe()
    }
  }, [user])

  if (loading) {
    return (
      <View>
        <Text style={{ fontSize: 40 }}>Loading...</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Lexis Movies" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}

export default Root
