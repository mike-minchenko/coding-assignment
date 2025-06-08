import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "test/utils"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MOCK_SEARCH_RESPONSE } from "test/mocks"
import App from "app/App"

describe("Watch Later test", () => {
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
    const findMovie = await screen.findByTestId(
      "movie: Avatar: The Way of Water",
    )
    expect(findMovie).toBeInTheDocument()

    const watchLaterLink = await within(findMovie).findByTestId("watch-later")
    await userEvent.click(watchLaterLink)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("Watch later functionality", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId("nav-watch-later"))

    await waitFor(() => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument()
    })

    await waitFor(() => {
      const movies = screen.getAllByTestId(/^movie:/)
      expect(movies).toHaveLength(1)
    })
  })
})
