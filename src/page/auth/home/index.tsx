import { useEffect, useState } from 'react'
import store, { useAppSelector } from '../../../core/store/redux-store'
import { Image, Input, ListItem, Text } from '@rneui/themed'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import movie from '../../../core/api/movie'
import { LinearProgress } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()
  const movies = useAppSelector((state) => state.movies)

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<string>('')

  const fetchMovies = async (queryParams) => {
    await movie.getMovies(queryParams)
  }

  useEffect(() => {
    if (!movies) {
      try {
        setLoading(true)
        fetchMovies({ query: search, start: 0, end: 10 })
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const loadMore = async () => {
    setLoading(true)
    try {
      await fetchMovies({ query: search, start: movies?.length ?? 0, end: movies?.length ?? 0 + 10 })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    store.dispatch({ type: 'movies/clear' })
    movie
      .getMovies({ query: search, start: 0, end: 10 })
      .then()
      .catch()
      .finally(() => setLoading(false))
  }, [search])

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('Detail', { id: item.id })}>
      <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image
          source={{ uri: item.poster_path }}
          style={{ width: 50, height: 50 }} // Adjust the width and height as needed
        />
        <View style={{ flex: 3 }}>
          <ListItem.Title style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 12, color: '#00000090' }}>
            {item.genre.replace('{', '').replace('}', '').split(',').join(', ')}
          </ListItem.Subtitle>
          <Text style={{ color: '#000000cc' }}>({new Date(item.release_date).getFullYear()})</Text>
        </View>
        <View style={{ flex: 1, marginLeft: '2%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#00000090' }}>{item.runtime} min</Text>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  const keyExtractor = (item, index) => index.toString()

  const renderFooter = () => {
    if (!loading) return null
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View>
      <Input keyboardType="web-search" placeholder="Search" value={search} onChangeText={(e) => setSearch(e)} />
      {loading && <LinearProgress variant="indeterminate" color="blue" style={styles.loadingIndicator} />}
      <FlatList
        keyExtractor={keyExtractor}
        data={movies}
        renderItem={renderItem}
        onEndReached={loadMore} // Call loadMore when end of list is reached
        onEndReachedThreshold={1} // Trigger when 10% from the bottom
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default Home

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
