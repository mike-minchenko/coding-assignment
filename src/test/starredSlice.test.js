import starredSlice from '../data/starredSlice'
import { moviesMock } from './movies.mocks'

// - Edge cases should be added

describe('starredSlice test', () => {

    // There is no point in defining a state constant here.
    const state = { starredMovies: [] }

    it('should set an initial state', () => {
        const initialState = state
        const action = { type: '' }
        // const result = starredSlice.getInitialState() can be used instead
        const result = starredSlice.reducer(initialState, action)
        expect(result).toEqual({ starredMovies: []})
      })    

      it('should add movie to starred', () => {
        const initialState = { ...state, starredMovies: [] }
        const action = starredSlice.actions.starMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)
        expect(result.starredMovies[0]).toBe(moviesMock[0])
        // Also, we can check the length of the result array
      })

      it('should remove movie from starred', () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.unstarMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)
        expect(result.starredMovies[0]).toBe(moviesMock[1])
        // Also, we can check the length of the result array
      })

      it('should remove all movies', () => {
        const initialState = { ...state, starredMovies: moviesMock }
        // Not needed to pass the state into the 'clearAllStarred' function
        const action = starredSlice.actions.clearAllStarred(state)
        const result = starredSlice.reducer(initialState, action)
        // expect(result.starredMovies).toHaveLength(0)
        expect(Object.keys(result.starredMovies).length).toEqual(0)
      })
})