import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../core/store/redux-store'
import { Text } from '@rneui/themed'
import { View } from 'react-native'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const user = useAppSelector((state) => state.user)
  const movies = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!movies.length) {
    }
  }, [movies])
  return (
    <View>
      <Text h3>Welcome {user.name}</Text>
      <Text h4>Movie list</Text>
    </View>
  )
}

export default Home
