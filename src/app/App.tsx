import { useEffect } from "react"
import { createSearchParams, useSearchParams, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { fetchMovies } from "../store/reducers/moviesSlice"
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "shared/constants"
import { Header, TrailerModal } from "components"
import { RouterView } from "../routes"
import "./App.scss"

const App = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")
  const navigate = useNavigate()

  const getSearchResults = query => {
    if (query !== "") {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = query => {
    navigate("/")
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER + "&append_to_response=videos"))
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <RouterView />
      <TrailerModal />
    </div>
  )
}

export default App
