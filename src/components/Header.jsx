import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

import '../styles/header.scss'

const Header = ({ searchMovies }) => {
  
  const { starredMovies } = useSelector((state) => state.starred)

  /*
  - () => searchMovies('') - repeated logic.
    It's better to create a separate function.
    const clearSearch = () => searchMovies('')
  - It's better to use debounce on input change action
  - To avoid global class conflicts, start class names from the name of the component ("header", "header__link", "header__search" etc.)
  */

  return (
    <header>
      {/*aria-label="Go to homepage"*/}
      <Link to="/" data-testid="home"  onClick={() => searchMovies('')}>
        {/*aria-hidden=true*/}
        <i className="bi bi-film" />
      </Link>

      <nav>
        {/*aria-label="View starred movies"*/}
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              {/*aria-hidden="true"*/}
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            //aria-hidden="true"
            <i className="bi bi-star" />
          )}
        </NavLink>

        <NavLink to="/watch-later" className="nav-fav">
          {/*Text should start with a capital letter.*/}
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        {/*
        - The element "input" must not appear as a descendant of the Link("a") element.
        - Better to use onChange instead of onKeyUp
        - aria-describedby="search-addon" - unnecessary
        */}
        <Link to="/" onClick={(e) => searchMovies('')} className="search-link" >
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={(e) => searchMovies(e.target.value)} 
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
            />
        </Link>            
      </div>      
    </header>
  )
}

export default Header
