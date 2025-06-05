import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

// - Consider testing initial state and unknown actions
// - Test edge cases like empty payload

describe('MovieSlice test', () => {
    
    it('should set loading true while action is pending', () => {
        const action = {type: fetchMovies.pending};
        // I would change it to a more suitable name.
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '', // repeating code. can be moved to a constant "DEFAULT_STATE"
        }, action);
        // You're testing the action instead of the state change
        // Test the resulting state, not the action itself
        expect(action).toEqual({type: fetchMovies.pending})
     })

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled, 
            payload: moviesMock
        };
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        // Test if movies array was updated and status changed
        expect(action.payload).toBeTruthy()
    })

    it('should set error when action is rejected', () => {
        const action = {type: fetchMovies.rejected};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        // Again testing action instead of state
        expect(action).toEqual({type: fetchMovies.rejected})
     })

})