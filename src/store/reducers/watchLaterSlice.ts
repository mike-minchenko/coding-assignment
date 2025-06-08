import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { IMovie } from "../../models/movie"
import { createAppSelector } from "../utils"

interface WatchLaterState {
  watchLaterMovies: IMovie[]
}

const initialState: WatchLaterState = {
  watchLaterMovies: [],
}

export const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<IMovie>) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
    },
    removeFromWatchLater: (state, action: PayloadAction<IMovie>) => {
      state.watchLaterMovies = state.watchLaterMovies.filter(
        item => item.id !== action.payload.id,
      )
    },
    removeAllWatchLater: state => {
      state.watchLaterMovies = []
    },
  },
})

export const selectWatchLaterIds = createAppSelector(
  [state => state.watchLater.watchLaterMovies, (_, id: number) => id],
  (movies, id) => movies.some(movie => movie.id === id),
)

export default watchLaterSlice.reducer
