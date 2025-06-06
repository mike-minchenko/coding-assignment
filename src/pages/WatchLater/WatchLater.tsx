import { Link } from "react-router"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../store/hooks"
import { watchLaterSlice } from "../../store/reducers/watchLaterSlice"

import Movie from "../Movies/Movie"
import "../Starred/starred.scss"

const WatchLater = ({ viewTrailer }) => {
  const watchLaterMovies = useAppSelector(
    state => state.watchLater.watchLaterMovies,
  )
  const { remveAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 && (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row">
            {watchLaterMovies.map(movie => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => dispatch(remveAllWatchLater())}
            >
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLaterMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default WatchLater
