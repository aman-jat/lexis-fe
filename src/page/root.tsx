import React from 'react'
import { StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './unauth/login'
import Register from './unauth/register'
import Home from './auth/home'
import Detail from './auth/detail'
import { auth } from '../core/api'
import { useAppSelector } from '../core/store/redux-store'
import { useAsync } from 'react-use'
import { LinearProgress } from '@rneui/base'

const Stack = createStackNavigator()

const Root = (): React.JSX.Element => {
  const user = useAppSelector((state) => state.user)

  const { loading, error } = useAsync(() => {
    if (!user) {
      return auth.getMe()
    } else {
      return Promise.reject()
    }
  }, [user])

  return (
    <>
      {loading && <LinearProgress variant="indeterminate" color="blue" style={styles.loadingIndicator} />}
      {!loading && !error && user && (
        <Stack.Navigator>
          <Stack.Screen name="Lexis Movies" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      )}
      {!loading && !user && (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000 // Ensure it's above the FlatList
  }
})

export default Root
