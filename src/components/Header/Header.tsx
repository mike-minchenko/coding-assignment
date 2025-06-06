import { Link, NavLink } from "react-router"

import "./Header.scss"
import { APP_ROUTES } from "../../routes"
import StarredNavIcon from "./StarredNavIcon/StarredNavIcon"

const Header = ({ searchMovies }) => {
  return (
    <header className="header">
      <Link
        to={APP_ROUTES.MOVIES}
        data-testid="home"
        onClick={() => searchMovies("")}
        aria-lael="Go to the home page"
        className="header__home-link"
      >
        <i className="bi bi-film" aria-hidden="true" />
      </Link>

      <div className="rounded header__search-input">
        <input
          type="search"
          data-testid="search-movies"
          onKeyUp={e => searchMovies(e.target.value)}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies input"
        />
      </div>

      <nav className="header__nav-block">
        <NavLink
          to={APP_ROUTES.STARRED}
          data-testid="nav-starred"
          className="header__starred-link"
          aria-label="Starred movies"
        >
          <StarredNavIcon />
        </NavLink>
        <NavLink
          to={APP_ROUTES.WATCH_LATER}
          className="header__wtach-later-link"
        >
          Watch later
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
