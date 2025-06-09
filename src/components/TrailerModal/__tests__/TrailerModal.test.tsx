import { mockFetch, renderWithProviders } from "test/utils"
import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { MOCK_SEARCH_RESPONSE, MOCK_VIDEOS_RESPONSE } from "test/mocks"
import App from "app/App"

describe("TrailerModal", () => {
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

  it("renders YoutubePlayer when video is found", async () => {
    const movie = await screen.findByTestId("movie: Avatar: The Way of Water")
    const viewTrailerBtn = within(movie).getByTestId("view-trailer")
    await userEvent.click(viewTrailerBtn)

    const player = await screen.findByTestId("youtube-player")
    expect(player).toBeInTheDocument()
  })

  it("renders fallback if no trailer found", async () => {
    mockFetch({
      "/search/movie": MOCK_SEARCH_RESPONSE,
      "\\/movie\\/\\d+\\/videos": { results: [] },
    })

    const movie = await screen.findByTestId("movie: Avatar: The Way of Water")
    const viewTrailerBtn = within(movie).getByTestId("view-trailer")
    await userEvent.click(viewTrailerBtn)

    const fallback = await screen.findByTestId("no-trailer-message")
    expect(fallback).toBeInTheDocument()
  })
})
