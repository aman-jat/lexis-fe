import React from 'react'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import store from './src/core/store/redux-store'
import Root from './src/page/root'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Root />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </NavigationContainer>
  )
}

export default App
