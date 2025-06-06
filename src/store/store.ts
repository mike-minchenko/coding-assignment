import { combineReducers, configureStore } from "@reduxjs/toolkit"
import moviesReducer from "./reducers/moviesSlice"
import starredReducer from "./reducers/starredSlice"
import trailerReducer from "./reducers/trailerSlice"
import watchLaterReducer from "./reducers/watchLaterSlice"

const rootReducer = combineReducers({
  movies: moviesReducer,
  starred: starredReducer,
  watchLater: watchLaterReducer,
  trailer: trailerReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
