import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { mockFetch, renderWithProviders } from "test/utils"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MOCK_SEARCH_RESPONSE, MOCK_VIDEOS_RESPONSE } from "test/mocks"
import App from "app/App"

describe("Favourites wrapper test", () => {
  let movie: HTMLElement
  beforeEach(async () => {
    mockFetch({
      "/search/movie": MOCK_SEARCH_RESPONSE,
      "\\/movie\\/\\d+\\/videos": MOCK_VIDEOS_RESPONSE,
    })

    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId("search-movies-input"), "avatar")
    movie = await screen.findByTestId("movie: Avatar: The Way of Water")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("add to watch later and check in the list", async () => {
    expect(movie).toBeInTheDocument()
    const watchLaterLink = await within(movie).findByTestId(
      "add-to-watch-later-btn",
    )

    const user = userEvent.setup()
    await user.click(watchLaterLink)
    await user.click(screen.getByTestId("nav-watch-later"))

    await waitFor(() => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument()
    })

    await waitFor(() => {
      const movies = screen.getAllByTestId(/^movie:/)
      expect(movies).toHaveLength(1)
    })
  })

  it("add to starred and check in the list", async () => {
    expect(movie).toBeInTheDocument()
    const starrLink = await within(movie).findByTestId("starr-movie-btn")

    const user = userEvent.setup()
    await user.click(starrLink)
    await user.click(screen.getByTestId("nav-starred"))

    await waitFor(() => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument()
    })

    await waitFor(() => {
      const movies = screen.getAllByTestId(/^movie:/)
      expect(movies).toHaveLength(1)
    })
  })

  it("empty list", async () => {
    expect(movie).toBeInTheDocument()
    const watchLaterLink = await within(movie).findByTestId(
      "add-to-watch-later-btn",
    )

    const user = userEvent.setup()
    await user.click(watchLaterLink)
    await user.click(screen.getByTestId("nav-watch-later"))

    await waitFor(() => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument()
    })

    await waitFor(() => {
      const movies = screen.getAllByTestId(/^movie:/)
      expect(movies).toHaveLength(1)
    })

    const emptyListBtn = screen.getByTestId("remove-from-favourites-btn")
    await user.click(emptyListBtn)

    const emptyMessage = await screen.findByTestId("favourites-empty-text")
    expect(emptyMessage).toBeInTheDocument()
  })
})
