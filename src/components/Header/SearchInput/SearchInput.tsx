import { type ChangeEvent, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useDebounce } from "hooks/useDebounce"
import { useSearchMoviesFilters } from "hooks/useSearchMoviesFilters"
import type { SearchFilter } from "models/searchFilter"
import { APP_ROUTES } from "routes"

const SearchInput = () => {
  const { searchValue, setFilters } = useSearchMoviesFilters()
  const navigate = useNavigate()
  const [searchInputValue, setSearchInputValue] =
    useState<SearchFilter["search"]>(searchValue)
  const debouncedSearchInputValue = useDebounce(searchInputValue)
  const location = useLocation()

  const onSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setSearchInputValue(value)
    },
    [],
  )

  useEffect(() => {
    if (!location.pathname.includes(APP_ROUTES.MOVIES)) {
      setSearchInputValue("")
    }
  }, [location.pathname])

  useEffect(() => {
    setFilters({ search: debouncedSearchInputValue })
  }, [debouncedSearchInputValue])

  const onInputFocus = () => {
    if (location.pathname.includes(APP_ROUTES.MOVIES)) {
      return
    }
    navigate(APP_ROUTES.MOVIES)
  }

  return (
    <div className="rounded header__search-input">
      <input
        value={searchInputValue}
        type="search"
        data-testid="search-movies-input"
        onChange={onSearchInputChange}
        onFocus={onInputFocus}
        className="form-control rounded"
        placeholder="Search movies..."
        aria-label="Search movies"
      />
    </div>
  )
}

export default SearchInput
