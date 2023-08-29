import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import { MemoryRouter as Router } from "react-router-dom";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}