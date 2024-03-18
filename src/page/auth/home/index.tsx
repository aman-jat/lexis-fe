import { useCallback, useEffect, useState } from 'react'
import store, { useAppSelector } from '../../../core/store/redux-store'
import { Button, Image, Input, ListItem, Text } from '@rneui/themed'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import movie from '../../../core/api/movie'
import { LinearProgress } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import showSnackbar from '../../../components/snack-message'

const PAGE_SIZE = 10

const Home = () => {
  const navigation = useNavigation()
  const movies = useAppSelector((state) => state.movies)

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<string>('')

  const fetchMovies = async (queryParams) => {
    try {
      setLoading(true)
      await movie.getMovies(queryParams)
    } catch (error) {
      showSnackbar(e?.[0] ?? e.message ?? 'Invalid error')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!loading) {
      fetchMovies({ query: search, start: 0, end: PAGE_SIZE })
    }
  }, [])

  useEffect(() => {
    store.dispatch({ type: 'movies/clear' })
    fetchMovies({ query: search, start: 0, end: PAGE_SIZE })
  }, [search])

  const loadMore = async () => {
    if (!loading && movies && movies.length) {
      fetchMovies({ query: search, start: movies.length, end: movies.length + PAGE_SIZE })
    }
  }

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

  return (
    <View>
      <Input keyboardType="web-search" placeholder="Search" value={search} onChangeText={(e) => setSearch(e)} />
      {loading && <LinearProgress variant="indeterminate" color="blue" style={styles.loadingIndicator} />}
      {!loading && !movies?.length && (
        <View style={{ alignItems: 'center', paddingVertical: 50 }}>
          <Text>0 Movies found</Text>
        </View>
      )}
      <FlatList
        keyExtractor={keyExtractor}
        data={movies}
        renderItem={renderItem}
        initialNumToRender={10}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          movies?.length ? (
            <View style={{ paddingBottom: 75 }}>
              <Button disabled={loading || !movies?.length} title="Singa" onPress={loadMore}>
                Load More
              </Button>
            </View>
          ) : (
            <></>
          )
        }
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
