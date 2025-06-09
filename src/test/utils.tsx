import type { PropsWithChildren, ReactNode } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import { render } from "@testing-library/react"
import { setupListeners } from "@reduxjs/toolkit/query"
import { vi } from "vitest"

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

export const mockFetch = (matchers: Record<string, unknown>) => {
  const originalFetch = global.fetch

  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, options?: RequestInit) => {
      for (const [pattern, response] of Object.entries(matchers)) {
        let matches = false

        try {
          const regex = new RegExp(pattern)
          matches = regex.test(url)
        } catch {
          matches = url.includes(pattern)
        }

        if (matches) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(response),
          })
        }
      }

      console.warn(`No mock found for ${url}`)
      return originalFetch(url, options)
    }),
  )
}
