import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IMovie } from "../../models/movie"
import { createAppSelector } from "../utils"

interface StarredState {
  starredMovies: IMovie[]
}

const initialState: StarredState = {
  starredMovies: [],
}

export const starredSlice = createSlice({
  name: "starred",
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<IMovie>) => {
      state.starredMovies = [action.payload, ...state.starredMovies]
    },
    unstarMovie: (state, action: PayloadAction<IMovie>) => {
      state.starredMovies = state.starredMovies.filter(
        item => item.id !== action.payload.id,
      )
    },
    clearAllStarred: state => {
      state.starredMovies = []
    },
  },
})

export const selectStarredIds = createAppSelector(
  [state => state.starred.starredMovies, (_, id: number) => id],
  (movies, id) => movies.some(movie => movie.id === id),
)

export default starredSlice.reducer
