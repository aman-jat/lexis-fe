import Snackbar from 'react-native-snackbar'

const showSnackbar = (message: string) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT
  })
}

export default showSnackbar
