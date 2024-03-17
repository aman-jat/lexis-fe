import ajax from './ajax'

const movie = {
  getMovies: async (queryParams: { start: number; end: number }) => {
    return await ajax('movie', { method: 'GET', queryParams, dispatch: 'movies/insert' })
  }
}

export default movie
