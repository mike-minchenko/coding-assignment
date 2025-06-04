/*
API keys should never be committed to source control. This is a critical security issue. Create a separate file and define API_KEY there.
- .env
API_KEY=your_actual_key

- constants.js
export const API_KEY = process.env.API_KEY
*/
export const API_KEY = '8cac6dec66e09ab439c081b251304443'
export const ENDPOINT = 'https://api.themoviedb.org/3'
// Extra slash - /movie/?api_key
export const ENDPOINT_DISCOVER = ENDPOINT+'/discover/movie?api_key='+API_KEY+'&sort_by=vote_count.desc'
// Extra slash - /movie/?api_key
export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie?api_key='+API_KEY
export const ENDPOINT_MOVIE = ENDPOINT+'/movie/507086?api_key='+API_KEY+'&append_to_response=videos'

/*
 - It's better to se template literals instead of string concatenation.
   export const ENDPOINT_DISCOVER = `${ENDPOINT}/discover/movie?api_key=${API_KEY}`

 - Instead of defining full URLs with query parameters in constants, export only the base paths.
   Let the services handle dynamic parts like query strings and parameters.

    export const API_KEY = process.env.API_KEY

    export const ENDPOINT = 'https://api.themoviedb.org/3'

    export const API = {
      DISCOVER: `${ENDPOINT}/discover/movie`,
      SEARCH: `${ENDPOINT}/search/movie`,
      MOVIE: `${ENDPOINT}/movie`,
    }

    // services/movieService.js

    import { API, API_KEY } from '../shared/constants'

    export const fetchPopularMovies = () => {
      //........
      return fetch(`${API.DISCOVER}?api_key=${API_KEY}&sort_by=vote_count.desc`)
      //........
    }

*/