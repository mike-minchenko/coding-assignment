import { useAppSelector } from "../../../store/hooks"
import "./StarredNavIcon.scss"

const StarredNavIcon = () => {
  const starredMovies = useAppSelector(state => state.starred.starredMovies)

  if (!starredMovies.length) {
    return <i className="bi bi-star" aria-hidden="true" />
  }

  return (
    <div className="starred-nav-icon">
      <i className="bi bi-star-fill bi-star-fill-white" aria-hidden="true" />
      <sup
        className="starred-nav-icon__count"
        aria-label={`${starredMovies.length} movies`}
        aria-describedby=""
      >
        {starredMovies.length}
      </sup>
    </div>
  )
}

export default StarredNavIcon
