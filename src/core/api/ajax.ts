import axios from 'axios'
import { REACT_APP_BASE_URL } from '@env'
import { getAuthToken, storeAuthToken } from '../store/async-store'
import store from '../store/redux-store'

type AjaxOptions = {
  dispatch?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
  prefix?: string
  headers?: any
  showError?: boolean
  queryParams: any
}

const ajax = async function (
  path: string,
  { queryParams, dispatch, method = 'GET', data = null, showError = true }: AjaxOptions
): Promise<any> {
  try {
    const config = {
      method,
      url: `${REACT_APP_BASE_URL}/api/${path}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: await getAuthToken()
      },
      params: queryParams ?? undefined,
      data: undefined,
      withCredentials: true
    }
    if (data && Object.keys(data).length > 0) {
      if (method === 'GET') config.params = data
      else config.data = data
    }
    console.log('config', config)

    let resp: any = await axios(config)

    resp = resp.data
    if (resp.hasOwnProperty('sessionToken')) {
      storeAuthToken(resp.sessionToken)
    }
    if (dispatch) setTimeout(() => store.dispatch({ type: `${dispatch}`, payload: resp }), 0)
    return resp
  } catch (e: any) {
    const message = e.response?.data?.message || e.response?.data?.error || 'Unknown error'
    console.error('e', e)
    throw new Error(message)
  }
}
export default ajax
