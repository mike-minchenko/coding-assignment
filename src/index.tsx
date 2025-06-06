import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import { StrictMode } from "react"
import { setupStore } from "store/store"
import App from "app/App"
import "./index.scss"

const store = setupStore()
const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
