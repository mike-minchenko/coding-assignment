import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from "./test/utils"
import App from './App'

/*
- Better start tests with 'describe' block
- Move all renderWithProviders(<App />) into the 'beforeEach' block
- const user = userEvent.setup() also can be moved. One userEvent usage option must be selected. (userEvent.setup() or just userEvent)
- Better to use test-id instead of text search
- Better to mock fetch requests
*/

it('renders watch later link', () => {
  renderWithProviders(<App />)
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

it('search for movies', async () => {
  renderWithProviders(<App />)
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    // Better to use 'findByText' instead of 'waitFor' to have access to the element to find 'View Trailer' button inside this element.
    // Now the logic is incorrect.
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
  })
})

it('renders watch later component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})


it('renders starred component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred'))
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  // 'waitFor' unnecessary
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })  
})
