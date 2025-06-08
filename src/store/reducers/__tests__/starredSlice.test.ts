import { describe, it, expect } from "vitest"
import { starredSlice } from "../starredSlice"
import { MOVIES_MOCK } from "./mocks/movies.mocks"

const DEFAULT_STATE = starredSlice.getInitialState()

describe("starredSlice reducer tests", () => {
  it("should return initial state on unknown action", () => {
    const action = { type: "unknown" }
    const result = starredSlice.reducer(undefined, action)
    expect(result).toEqual(DEFAULT_STATE)
  })

  it("should add movie to starred", () => {
    const action = starredSlice.actions.starMovie(MOVIES_MOCK.results[0])
    const result = starredSlice.reducer(DEFAULT_STATE, action)
    expect(result.starredMovies).toContainEqual(MOVIES_MOCK.results[0])
    expect(result.starredMovies).toHaveLength(1)
  })

  it("should remove movie from starred", () => {
    const initialState = { starredMovies: MOVIES_MOCK.results }
    const action = starredSlice.actions.unstarMovie(MOVIES_MOCK.results[0])
    const result = starredSlice.reducer(initialState, action)
    expect(result.starredMovies).not.toContainEqual(MOVIES_MOCK.results[0])
    expect(result.starredMovies).toContainEqual(MOVIES_MOCK.results[1])
    expect(result.starredMovies).toHaveLength(1)
  })

  it("should remove all movies", () => {
    const initialState = { starredMovies: MOVIES_MOCK.results }
    const action = starredSlice.actions.clearAllStarred()
    const result = starredSlice.reducer(initialState, action)
    expect(result.starredMovies).toEqual([])
    expect(result.starredMovies).toHaveLength(0)
  })

  it("should do nothing if trying to unstar a movie that doesn't exist", () => {
    const initialState = { starredMovies: [MOVIES_MOCK.results[0]] }
    const nonExistingMovie = { ...MOVIES_MOCK.results[1], id: 999 }
    const action = starredSlice.actions.unstarMovie(nonExistingMovie)
    const result = starredSlice.reducer(initialState, action)
    expect(result.starredMovies).toEqual([MOVIES_MOCK.results[0]])
    expect(result.starredMovies).toHaveLength(1)
  })
})
