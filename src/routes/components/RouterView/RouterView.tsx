import { Route, Routes } from "react-router"
import { Movies, Starred, WatchLater, PageNotFound } from "../../../pages"
import { APP_ROUTES } from "../../constants"

const RouterView = () => {
  return (
    <div className="container">
      <Routes>
        <Route path={APP_ROUTES.MOVIES} element={<Movies />} />
        <Route path={APP_ROUTES.STARRED} element={<Starred />} />
        <Route path={APP_ROUTES.WATCH_LATER} element={<WatchLater />} />
        <Route path={APP_ROUTES.OTHERS} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default RouterView
