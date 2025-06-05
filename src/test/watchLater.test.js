import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

// - Start with 'describe' block.
// - Use more descriptive test name
// - Better to mock fetch requests

it('Watch Later movies page', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    // Better to use "findAllByText" to work with these elements later
    // Check the length before other manipulations
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    // My suggestion - Use getByRole or more specific selector
    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    await userEvent.click(watchLaterLink)

    // Unused code should be removed or finished

    // const watchLaterink = screen.getByTestId('watch-later-div')
    // await waitFor(() => {
    //     expect(watchLaterink).toBeInTheDocument()
    // })    
    // await userEvent.click(watchLaterink)
})