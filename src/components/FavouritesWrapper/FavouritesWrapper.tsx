import { Link } from "react-router"
import type { IMovie } from "models/movie"
import { useElementHeight } from "../../hooks/useElementHeight"
import MoviesList from "../MoviesList/MoviesList"
import "./FavouritesWrapper.scss"

const FavouritesWrapper = <T extends IMovie>({
  data,
  title,
  removeButtonText,
  emptyListText,
  onRemoveAll,
}: FavouritesWrapperProps<T>) => {
  const height = useElementHeight({ selector: "header.header" })

  if (!data.length) {
    return (
      <section className="favourites" data-testid="favourites">
        <div className="view-container">
          <div className="text-center empty-cart">
            <i className="bi bi-heart" aria-hidden="true" />
            <p data-testid="favourites-empty-text">{emptyListText}</p>
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
      <div className="header" style={{ top: height }}>
        <div className="view-container">
          <div className="favourites__header-inner">
            <h1 className="favourites__header-title" id="favourites-title">
              {title}
            </h1>
            <button
              data-testid="remove-from-favourites-btn"
              className="favourites__remove-button"
              onClick={onRemoveAll}
              aria-label={`Remove all movies from ${title}`}
            >
              {removeButtonText}
            </button>
          </div>
        </div>
      </div>
      <div className="view-container">
        <div data-testid="watch-later-movies">
          <MoviesList data={data} />
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
