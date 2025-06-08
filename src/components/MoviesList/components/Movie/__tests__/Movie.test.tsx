import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "test/utils"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MOCK_SEARCH_RESPONSE } from "test/mocks"
import App from "app/App"

describe("Movie starring and watch later", () => {
  beforeEach(async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(MOCK_SEARCH_RESPONSE),
        }),
      ),
    )

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

    const starMovieLink = await within(findMovie).findByTestId("starred-link")
    await user.click(starMovieLink)

    await waitFor(() => {
      expect(screen.getByTestId("star-fill")).toBeInTheDocument()
      expect(screen.getByTestId("unstar-link")).toBeInTheDocument()
    })
  })

  it("adds movie to watch later and removes it", async () => {
    const user = userEvent.setup()
    const findMovie = await screen.findByTestId(
      "movie: Avatar: The Way of Water",
    )
    expect(findMovie).toBeInTheDocument()

    const watchLaterLink = await within(findMovie).findByTestId("watch-later")
    await user.click(watchLaterLink)

    await waitFor(() => {
      expect(screen.getByTestId("remove-watch-later")).toBeInTheDocument()
    })
  })
})
