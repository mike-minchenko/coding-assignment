import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { IMovie } from "../../models/movie"
import { getMovies } from "../../services/moviesService"

export const fetchMovies = createAsyncThunk("fetch-movies", getMovies)

export interface MoviesState {
  movies: IMovie[]
  page: number
  totalPages: number
  fetchStatus: null | "success" | "error" | "loading"
}

const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPages: 1,
  fetchStatus: null,
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { page, results, total_pages } = action.payload

        state.fetchStatus = "success"
        state.page = page
        state.totalPages = total_pages

        if (page === 1) {
          state.movies = results
        } else {
          state.movies = [...state.movies, ...results]
        }

        state.fetchStatus = "success"
      })
      .addCase(fetchMovies.pending, state => {
        state.fetchStatus = "loading"
      })
      .addCase(fetchMovies.rejected, state => {
        state.fetchStatus = "error"
      })
  },
})

export default moviesSlice.reducer
