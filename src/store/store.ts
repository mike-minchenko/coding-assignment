import {
  combineReducers,
  configureStore,
  type ConfigureStoreOptions,
} from "@reduxjs/toolkit"
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

export const setupStore = (
  preloadedState: ConfigureStoreOptions["preloadedState"] = {},
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
