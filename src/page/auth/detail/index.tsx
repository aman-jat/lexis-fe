import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { useAppSelector } from '../../../core/store/redux-store'
import { Image } from '@rneui/themed'

const Details = () => {
  const route = useRoute() // Access the route object
  const movies = useAppSelector((state) => state.movies)

  if (!route.params?.id) {
    return <Text>404</Text>
  }
  const movie = movies.find((m) => m.id === route.params.id)
  const { title, overview, release_date, poster_path, genre, runtime } = movie

  const releaseDate = new Date(release_date)
  const formattedDate = releaseDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <View style={styles.container}>
      <Image source={{ uri: poster_path }} style={styles.poster} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{overview}</Text>
        <Text style={styles.info}>Release Date: {formattedDate}</Text>
        <Text style={styles.info}>Genre: {genre.replace('{', '').replace('}', '').split(',').join(', ')}</Text>
        <Text style={styles.info}>Runtime: {runtime} minutes</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20
  },
  detailsContainer: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  info: {
    fontSize: 16,
    marginBottom: 5
  }
})

export default Details
