import { screen, waitFor, within } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import userEvent from "@testing-library/user-event"
import { MOCK_SEARCH_RESPONSE, MOCK_VIDEOS_RESPONSE } from "test/mocks"
import { mockFetch, renderWithProviders } from "test/utils.tsx"
import App from "../App.tsx"

describe("App render test", () => {
  beforeEach(() => {
    renderWithProviders(<App />)
  })

  it("search for movies", async () => {
    mockFetch({
      "/search/movie": MOCK_SEARCH_RESPONSE,
      "\\/movie\\/\\d+\\/videos": MOCK_VIDEOS_RESPONSE,
    })

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
