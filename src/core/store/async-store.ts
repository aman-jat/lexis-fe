import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token)
  } catch (error) {
    console.error('Error storing auth token:', error)
  }
}

// Retrieving the authentication token
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken')
    return token
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken')
  } catch (error) {
    console.error('Error removing auth token:', error)
  }
}
