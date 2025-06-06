import { useDispatch, useSelector } from "react-redux"
import { API_KEY, ENDPOINT } from "../../shared/constants"
import { useAppSelector } from "../../store/hooks"
import { starredSlice } from "../../store/reducers/starredSlice"

import { trailerSlice } from "../../store/reducers/trailerSlice"

import placeholder from "assets/not-found-500X750.jpeg"
import { watchLaterSlice } from "../../store/reducers/watchLaterSlice"

const Movie = ({ movie, closeCard }) => {
  const starredMovies = useAppSelector(state => state.starred.starredMovies)
  const watchLaterMovies = useAppSelector(
    state => state.watchLater.watchLaterMovies,
  )
  const { openTrailerModal } = trailerSlice.actions
  const { starMovie, unstarMovie } = starredSlice.actions
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

  const dispatch = useDispatch()

  const myClickHandler = e => {
    if (!e) var e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
    e.target.parentElement.parentElement.classList.remove("opened")
  }

  const viewMovie = async (movie: any) => {
    const URL = `${ENDPOINT}/movie/${movie.id}/videos?api_key=${API_KEY}`
    const response = await fetch(URL)
    const data = await response.json()

    if (data.results.length) {
      const trailer = data.results.find(vid => vid.type === "Trailer")
      const trailerKey = trailer ? trailer.key : data.results[0].key
      dispatch(openTrailerModal(trailerKey))
    } else {
      dispatch(openTrailerModal(null))
    }
  }

  return (
    <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div
        className="card"
        onClick={e => e.currentTarget.classList.add("opened")}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!starredMovies.map(movie => movie.id).includes(movie.id) ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() =>
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    }),
                  )
                }
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLaterMovies.map(movie => movie.id).includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() =>
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    }),
                  )
                }
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => viewMovie(movie)}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={e => myClickHandler(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}

export default Movie
