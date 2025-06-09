import { memo } from "react"
import placeholder from "../../../../assets/not-found-500X750.jpeg"
import { useViewTrailer } from "../../../../hooks/useViewTrailer"
import type { IMovie } from "../../../../models/movie"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import {
  selectStarredIds,
  starredSlice,
} from "../../../../store/reducers/starredSlice"
import {
  selectWatchLaterIds,
  watchLaterSlice,
} from "../../../../store/reducers/watchLaterSlice"

const MovieBodyComponent = ({
  movie,
  onClick,
  onClose,
  className = "",
}: MovieBodyComponentProps) => {
  const isInStarred = useAppSelector(state => selectStarredIds(state, movie.id))
  const isInWatchLater = useAppSelector(state =>
    selectWatchLaterIds(state, movie.id),
  )
  const { viewTrailer } = useViewTrailer()

  const { starMovie, unstarMovie } = starredSlice.actions
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

  const dispatch = useAppDispatch()

  const posterImage = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : placeholder

  return (
    <div
      className={`movie ${className}`}
      onClick={onClick}
      data-testid={`movie: ${movie.title}`}
      aria-labelledby={`movie-title-${movie.id}`}
      role="region"
    >
      <img
        width={500}
        height={750}
        src={posterImage}
        alt={movie.title}
        className="movie__poster"
        loading="lazy"
      />
      <div className="movie__title-wrapper">
        <h2 className="movie__title" id={`movie-title-${movie.id}`}>
          {movie.title}
        </h2>
      </div>

      <div className="movie__overlay">
        <h3 className="movie__overlay-title">{movie.title}</h3>
        <p className="movie__description">{movie.overview}</p>
        <p className="movie__year">{movie.release_date?.substring(0, 4)}</p>
        <div className="movie__buttons">
          {!isInStarred ? (
            <button
              className="movie__btn-star"
              data-testid="starr-movie-btn"
              aria-label="Add to starred movies"
              onClick={() => dispatch(starMovie(movie))}
            >
              <i className="bi bi-star" aria-hidden="true" />
            </button>
          ) : (
            <button
              className="movie__btn-star"
              data-testid="unstar-movie-btn"
              aria-label="Remove from starred movies"
              onClick={() => dispatch(unstarMovie(movie))}
            >
              <i
                className="bi bi-star-fill"
                data-testid="star-fill"
                aria-hidden="true"
              />
            </button>
          )}
          {!isInWatchLater ? (
            <button
              type="button"
              data-testid="add-to-watch-later-btn"
              className="btn btn-light movie__btn-watch-later"
              aria-label="Add to watch later"
              onClick={() => dispatch(addToWatchLater(movie))}
            >
              Watch Later
            </button>
          ) : (
            <button
              type="button"
              data-testid="remove-from-watch-later-btn"
              className="btn btn-light movie__btn-watch-later blue"
              onClick={() => dispatch(removeFromWatchLater(movie))}
              aria-label="Remove from watch later"
            >
              <i className="bi bi-check" aria-hidden="true"></i>
            </button>
          )}
          <button
            type="button"
            className="btn btn-dark movie__btn-view-trailer"
            onClick={() => viewTrailer(movie.id)}
            data-testid="view-trailer"
            aria-label={`View trailer for ${movie.title}`}
          >
            View Trailer
          </button>
        </div>
        <button
          type="button"
          className="movie__modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="bi bi-x" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default memo(MovieBodyComponent)

interface MovieBodyComponentProps {
  movie: IMovie
  onClose?: () => void
  onClick?: () => void
  className?: string
}
