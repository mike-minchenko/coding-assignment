import { Link, NavLink, useLocation } from "react-router"
import { APP_ROUTES } from "routes"
import SearchInput from "./SearchInput/SearchInput"
import StarredNavIcon from "./StarredNavIcon/StarredNavIcon"
import "./Header.scss"

const Header = () => {
  const location = useLocation()
  return (
    <header className="header">
      <div className="header__inner view-container">
        <Link
          to={{ pathname: APP_ROUTES.MOVIES, search: location.search }}
          data-testid="home"
          aria-label="Go to the home page"
          title="Go to the home page"
          className="header__home-link"
        >
          <i className="bi bi-film" aria-hidden="true" />
        </Link>

        <SearchInput />

        <nav className="header__nav-block" aria-label="Main navigation">
          <NavLink
            key="starred-nav"
            to={APP_ROUTES.STARRED}
            data-testid="nav-starred"
            className="header__starred-link"
            aria-label="Starred movies"
            title="Starred movies"
          >
            <StarredNavIcon />
          </NavLink>

          <NavLink
            to={APP_ROUTES.WATCH_LATER}
            className="header__wtach-later-link"
            data-testid="nav-watch-later"
          >
            Watch later
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
