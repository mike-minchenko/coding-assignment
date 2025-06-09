import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { mockFetch, renderWithProviders } from "test/utils"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MOCK_SEARCH_RESPONSE, MOCK_VIDEOS_RESPONSE } from "test/mocks"
import App from "app/App"

describe("Movie starring and watch later", () => {
  beforeEach(async () => {
    mockFetch({
      "/search/movie": MOCK_SEARCH_RESPONSE,
      "\\/movie\\/\\d+\\/videos": MOCK_VIDEOS_RESPONSE,
    })

    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId("search-movies-input"), "avatar")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("stars the movie", async () => {
    const user = userEvent.setup()
    const findMovie = await screen.findByTestId(
      "movie: Avatar: The Way of Water",
    )
    expect(findMovie).toBeInTheDocument()

    const starMovieLink =
      await within(findMovie).findByTestId("starr-movie-btn")
    await user.click(starMovieLink)

    await waitFor(() => {
      expect(screen.getByTestId("star-fill")).toBeInTheDocument()
      expect(screen.getByTestId("unstar-movie-btn")).toBeInTheDocument()
    })
  })

  it("adds movie to watch later and removes it", async () => {
    const user = userEvent.setup()
    const findMovie = await screen.findByTestId(
      "movie: Avatar: The Way of Water",
    )
    expect(findMovie).toBeInTheDocument()

    const watchLaterLink = await within(findMovie).findByTestId(
      "add-to-watch-later-btn",
    )
    await user.click(watchLaterLink)

    await waitFor(() => {
      expect(
        screen.getByTestId("remove-from-watch-later-btn"),
      ).toBeInTheDocument()
    })
  })
})
