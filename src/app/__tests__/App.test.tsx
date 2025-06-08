import { screen, waitFor, within } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { MOCK_SEARCH_RESPONSE } from "../../test/mocks"
import { renderWithProviders } from "../../test/utils.tsx"
import App from "../App.tsx"

describe("App render tests", () => {
  beforeEach(() => {
    renderWithProviders(<App />)
  })

  it("search for movies", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(MOCK_SEARCH_RESPONSE),
        }),
      ),
    )

    const user = userEvent.setup()
    await user.type(screen.getByTestId("search-movies-input"), "avatar")

    const movie = await screen.findByTestId("movie: Avatar: The Way of Water")
    expect(movie).toBeInTheDocument()

    const viewTrailerBtn = within(movie).getByTestId("view-trailer")
    await userEvent.click(viewTrailerBtn)
    await waitFor(() => {
      expect(screen.getByTestId("youtube-player")).toBeInTheDocument()
    })
  })

  it("renders watch later component", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId("nav-watch-later"))

    await waitFor(() => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument()
    })
  })

  it("renders favourites component", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId("nav-starred"))

    await waitFor(() => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument()
    })
  })
})
