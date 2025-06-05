import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import store from './data/store'
import './index.scss'
import App from './App'
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>      
  </StrictMode>
)
