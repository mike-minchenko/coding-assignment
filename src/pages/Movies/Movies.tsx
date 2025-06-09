import { useCallback, useEffect } from "react"
import { LoadingText, MoviesList } from "components"
import { useInfiniteScroll } from "hooks/useInfinityScroll"
import { useSearchMoviesFilters } from "hooks/useSearchMoviesFilters"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { fetchMovies } from "store/reducers/moviesSlice"
import EmptySearch from "components/EmptySearch/EmptySearch"

const Movies = () => {
  const movies = useAppSelector(state => state.movies.movies)
  const fetchStatus = useAppSelector(state => state.movies.fetchStatus)
  const page = useAppSelector(state => state.movies.page)
  const totalPages = useAppSelector(state => state.movies.totalPages)
  const isLoading = fetchStatus === "loading"

  const { searchValue } = useSearchMoviesFilters()
  const dispatch = useAppDispatch()

  const fetchMore = useCallback(() => {
    dispatch(fetchMovies({ queryString: searchValue, page: page + 1 }))
  }, [dispatch, page, searchValue])

  useInfiniteScroll({
    callback: fetchMore,
    isLoading,
    hasMore: page < totalPages,
  })

  useEffect(() => {
    dispatch(fetchMovies({ queryString: searchValue }))
  }, [searchValue])

  return (
    <section aria-label="Movies">
      <div className="view-container">
        <MoviesList data={movies} />
        {isLoading && <LoadingText />}
        {!isLoading && !movies.length ? (
          <EmptySearch searchValue={searchValue} />
        ) : null}
      </div>
    </section>
  )
}

export default Movies
