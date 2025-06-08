import { Link } from "react-router"
import type { IMovie } from "models/movie"
import "./FavouritesWrapper.scss"
import MoviesList from "../MoviesList/MoviesList"

const FavouritesWrapper = <T extends IMovie>({
  data,
  title,
  removeButtonText,
  emptyListText,
  onRemoveAll,
}: FavouritesWrapperProps<T>) => {
  if (!data.length) {
    return (
      <section className="favourites" data-testid="favourites">
        <div className="view-container">
          <div className="text-center empty-cart">
            <i className="bi bi-heart" aria-hidden="true" />
            <p>{emptyListText}</p>
            <p>
              Go to{" "}
              <Link to="/" aria-label="Go home">
                Home
              </Link>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="favourites"
      data-testid="favourites"
      aria-labelledby="favourites-title"
    >
      <div className="header">
        <div className="view-container">
          <h1 id="favourites-title">{title}</h1>
        </div>
      </div>
      <div className="view-container">
        <div data-testid="watch-later-movies">
          <MoviesList data={data} />

          <button
            className="btn btn-primary"
            onClick={onRemoveAll}
            aria-label={`Remove all movies from ${title}`}
          >
            {removeButtonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default FavouritesWrapper

interface FavouritesWrapperProps<T> {
  data: T[]
  title: string
  removeButtonText: string
  emptyListText: string
  onRemoveAll: () => void
}
