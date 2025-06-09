import { renderHook, act } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, it, expect } from "vitest"
import { useSearchMoviesFilters } from "../useSearchMoviesFilters"
import type { SearchFilter } from "models/searchFilter"

const createWrapper = (initialEntries: string[] = ["/"]) => {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  )
}

describe("useSearchMoviesFilters", () => {
  it("should return empty search value when no search param in URL", () => {
    const { result } = renderHook(() => useSearchMoviesFilters(), {
      wrapper: createWrapper(["/"]),
    })
    expect(result.current.searchValue).toBe("")
  })

  it("should return search value from URL params", () => {
    const { result } = renderHook(() => useSearchMoviesFilters(), {
      wrapper: createWrapper(["/?search=avatar"]),
    })
    expect(result.current.searchValue).toBe("avatar")
  })

  it("should set search filter and update URL", () => {
    const { result } = renderHook(() => useSearchMoviesFilters(), {
      wrapper: createWrapper(["/"]),
    })
    act(() => {
      result.current.setFilters({ search: "batman" })
    })
    expect(result.current.searchValue).toBe("batman")
  })

  it("should update existing search filter in URL", () => {
    const { result } = renderHook(() => useSearchMoviesFilters(), {
      wrapper: createWrapper(["/?search=avatar"]),
    })
    expect(result.current.searchValue).toBe("avatar")
    act(() => {
      result.current.setFilters({ search: "spiderman" })
    })
    expect(result.current.searchValue).toBe("spiderman")
  })

  it("should remove search param when setting empty string", () => {
    const { result } = renderHook(() => useSearchMoviesFilters(), {
      wrapper: createWrapper(["/?search=avatar"]),
    })
    expect(result.current.searchValue).toBe("avatar")
    act(() => {
      result.current.setFilters({ search: "" })
    })
    expect(result.current.searchValue).toBe("")
  })

  it("should handle undefined search in filters", () => {
    const { result } = renderHook(() => useSearchMoviesFilters(), {
      wrapper: createWrapper(["/?search=avatar"]),
    })
    expect(result.current.searchValue).toBe("avatar")
    act(() => {
      result.current.setFilters({} as SearchFilter)
    })
    expect(result.current.searchValue).toBe("avatar")
  })

  describe("edge cases", () => {
    it("should handle special characters in search", () => {
      const searchWithSpecialChars = "movie with spaces & symbols!"
      const { result } = renderHook(() => useSearchMoviesFilters(), {
        wrapper: createWrapper([
          `/?search=${encodeURIComponent(searchWithSpecialChars)}`,
        ]),
      })
      expect(result.current.searchValue).toBe(searchWithSpecialChars)
      act(() => {
        result.current.setFilters({ search: "new search & more!" })
      })
      expect(result.current.searchValue).toBe("new search & more!")
    })

    it("should handle null and undefined values correctly", () => {
      const { result } = renderHook(() => useSearchMoviesFilters(), {
        wrapper: createWrapper(["/?search=test"]),
      })
      act(() => {
        result.current.setFilters({ search: null as any })
      })
      expect(result.current.searchValue).toBe("")
    })
  })
})
