import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
// Move into the global styles (index.scss)
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'

const App = () => {
  /*
    I see selecting the whole Redux state, which triggers re-renders for any change — inefficient.
    better: const state = useSelector((state) => state.movies)

    The second. Movies aren't used in an App component directly.
    The state should be moved inside a Movies component.
  */
  const state = useSelector((state) => state)
  const { movies } = state  
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  /*
   I think you can use object structure for modal window state.
   const [trailerModalState, setTrailerModalState] = useState({ videoKey: "", isOpen: false })
  */
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

  //unused function
  const closeModal = () => setOpen(false)

  //function without logic inside
  const closeCard = () => {

  }
  /*
   - Duplicate fetch logic in getMovies and getSearchResults
   - createSearchParams is redundant

   const getMovies = (query = searchQuery) => {
    const url = query
      ? `${ENDPOINT_SEARCH}&query=${query}`
      : ENDPOINT_DISCOVER

    dispatch(fetchMovies(url))
    setSearchParams(query ? { search: query } : {})
  }
   */
  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  // searchMovies is redundant. Navigate has no sense. You can pass getSearchResults directly.
  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
    } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    // These lines have no sense. The value will be set to "true" in any case.
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    /*
     A Better solution would be to separate fetch and then

     const response = await fetch(URL)
     const videoData = await response.json()
    */
    const videoData = await fetch(URL)
      .then((response) => response.json())

    /*
    Create a constant and put the value in it. This will improve readability

    const videoDataResults = videoData.videos?.results

    And then you can use the constant
     if (videoDataResults?.length) {
        const trailer = videoDataResults.find(vid => vid.type === 'Trailer')
        setVideoKey(trailer ? trailer.key : videoDataResults[0].key)
     }
    */
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
    /*
     Would be better separate api logic. Remove all set functions and return the key.
     All manipulations with setting values should be performed at the top level.(in viewTrailer function, for example)
    */
  }

  useEffect(() => {
    getMovies()
  }, [])


  // Too many responsibilities. Component can be separated to Layout, TrailerModal, AppRoutes
  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          /*
          - Replace inline styles with CSS classes.
          - Text should start with a capital letter.
          - h6 is semantically incorrect in this context. Use a more appropriate semantic tag like <p>
          */
          <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
        )}

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          {/*It is better to create a separate component. PageNotFoud*/}
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
