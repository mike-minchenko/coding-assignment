import { describe, expect, it } from "vitest"
import moviesSliceReducer, {
  fetchMovies,
  type MoviesState,
} from "../moviesSlice"
import { MOVIES_MOCK } from "./mocks/movies.mocks"

const DEFAULT_STATE: MoviesState = {
  movies: [],
  fetchStatus: null,
  page: 1,
  totalPages: 1,
}

describe("MovieSlice reducer tests", () => {
  it("should return initial state when action is unknown", () => {
    const action = { type: "unknown" }
    const state = moviesSliceReducer(undefined, action)
    expect(state).toEqual(DEFAULT_STATE)
  })

  it("should set loading true while action is pending", () => {
    const action = { type: fetchMovies.pending.type }
    const state = moviesSliceReducer(DEFAULT_STATE, action)
    expect(state.fetchStatus).toBe("loading")
  })

  it("should update movies and status when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled.type,
      payload: MOVIES_MOCK,
    }
    const state = moviesSliceReducer(DEFAULT_STATE, action)
    expect(state.movies).toEqual(MOVIES_MOCK.results)
    expect(state.fetchStatus).toBe("success")
  })

  it("should set error status when action is rejected", () => {
    const action = { type: fetchMovies.rejected.type }
    const state = moviesSliceReducer(DEFAULT_STATE, action)
    expect(state.fetchStatus).toBe("error")
  })

  it("should handle empty payload gracefully", () => {
    const action = {
      type: fetchMovies.fulfilled.type,
      payload: {
        results: [],
      },
    }
    const state = moviesSliceReducer(DEFAULT_STATE, action)
    expect(state.movies).toEqual([])
    expect(state.fetchStatus).toBe("success")
  })
})
