
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { configureStore } from '@reduxjs/toolkit'

import moviesSlice from '../data/moviesSlice'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import { setupListeners } from "@reduxjs/toolkit/query";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { 
        movies: moviesSlice.reducer, 
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {

  setupListeners(store.dispatch)

  function Wrapper({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}