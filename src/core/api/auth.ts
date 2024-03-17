import { removeAuthToken } from '../store/async-store'
import store from '../store/redux-store'
import ajax from './ajax'

const auth = {
  getMe: async () => {
    return await ajax('auth', { method: 'GET', dispatch: 'user/insert' })
  },

  login: async (payload: { email: string; password: string }) => {
    return await ajax('auth/login', {
      method: 'POST',
      data: payload,
      dispatch: 'user/insert'
    })
  },

  register: async (payload: { name: string; email: string; password: string }) => {
    return await ajax('auth/register', {
      method: 'POST',
      data: payload,
      dispatch: 'user/insert'
    })
  },

  logout: async () => {
    const states = ['user', 'movies']
    states.forEach((type) => {
      store.dispatch({ type: `${type}/clear` })
    })
    await ajax('auth/logout', { dispatch: 'user/clear' })
    removeAuthToken()
  }
}

export default auth
