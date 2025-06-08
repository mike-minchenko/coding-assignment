import type { PropsWithChildren, ReactNode } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import { render } from "@testing-library/react"
import { setupListeners } from "@reduxjs/toolkit/query"

import { setupStore } from "../store/store"

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  setupListeners(store.dispatch)

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
