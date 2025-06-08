import { describe, it, expect } from "vitest"
import { watchLaterSlice } from "../watchLaterSlice"
import { MOVIES_MOCK } from "./mocks/movies.mocks"

const DEFAULT_STATE = watchLaterSlice.getInitialState()

describe("watchLaterSlice reducer tests", () => {
  it("should return initial state on unknown action", () => {
    const action = { type: "unknown" }
    const result = watchLaterSlice.reducer(undefined, action)
    expect(result).toEqual(DEFAULT_STATE)
  })

  it("should add movie to watch later", () => {
    const action = watchLaterSlice.actions.addToWatchLater(
      MOVIES_MOCK.results[0],
    )
    const result = watchLaterSlice.reducer(DEFAULT_STATE, action)
    expect(result.watchLaterMovies).toContainEqual(MOVIES_MOCK.results[0])
    expect(result.watchLaterMovies).toHaveLength(1)
  })

  it("should remove movie from watch later", () => {
    const initialState = { watchLaterMovies: MOVIES_MOCK.results }
    const action = watchLaterSlice.actions.removeFromWatchLater(
      MOVIES_MOCK.results[0],
    )
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result.watchLaterMovies).not.toContainEqual(MOVIES_MOCK.results[0])
    expect(result.watchLaterMovies).toContainEqual(MOVIES_MOCK.results[1])
    expect(result.watchLaterMovies).toHaveLength(1)
  })

  it("should remove all movies", () => {
    const initialState = { watchLaterMovies: MOVIES_MOCK.results }
    const action = watchLaterSlice.actions.removeAllWatchLater()
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result.watchLaterMovies).toEqual([])
    expect(result.watchLaterMovies).toHaveLength(0)
  })

  it("should not remove a movie if it's not in the list", () => {
    const initialState = { watchLaterMovies: [MOVIES_MOCK.results[0]] }
    const action = watchLaterSlice.actions.removeFromWatchLater(
      MOVIES_MOCK.results[1],
    )
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result.watchLaterMovies).toEqual([MOVIES_MOCK.results[0]])
    expect(result.watchLaterMovies).toHaveLength(1)
  })
})
