import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducerBuilder } from 'riducers'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const reducer = combineReducers({
  user: reducerBuilder('user', {}),
  movies: reducerBuilder('movies', {
    stateType: 'list',
    initialState: null
  }),
  snackbar: reducerBuilder('snackbar', { stateType: 'static' })
})

const store = configureStore({
  reducer,
  devTools: true
})

export type RootState = {
  user: any
  movies: any
  snackbar: any
}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
