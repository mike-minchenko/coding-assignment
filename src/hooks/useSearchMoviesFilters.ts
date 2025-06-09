import { useCallback } from "react"
import { useSearchParams } from "react-router"
import type { SearchFilter } from "models/searchFilter"

/**
 * Custom hook to manage movie search filters using URL parameters.
 *
 * @returns {Object} containing the current search value and a function to update search filters
 */
export const useSearchMoviesFilters = (): UseSearchMoviesReturn => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchValue =
    (searchParams.get("search") as SearchFilter["search"]) || ""

  const setFilters = useCallback(
    (filters: SearchFilter) => {
      setSearchParams(params => {
        if (filters.search !== undefined) {
          if (filters.search) {
            params.set("search", filters.search)
          } else {
            params.delete("search")
          }
        }

        return params
      })
    },
    [setSearchParams],
  )

  return {
    searchValue,
    setFilters,
  }
}

interface UseSearchMoviesReturn {
  searchValue: string
  setFilters: (filters: SearchFilter) => void
}
