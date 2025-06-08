import { Navigate, Route, Routes } from "react-router"
import { Movies, Starred, WatchLater, PageNotFound, Layout } from "pages"
import { APP_ROUTES } from "../../constants"

const RouterView = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.MAIN} element={<Layout />}>
        <Route index element={<Navigate to={APP_ROUTES.MOVIES} />} />
        <Route path={APP_ROUTES.MOVIES} element={<Movies />} />
        <Route path={APP_ROUTES.STARRED} element={<Starred />} />
        <Route path={APP_ROUTES.WATCH_LATER} element={<WatchLater />} />
        <Route path={APP_ROUTES.OTHERS} element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default RouterView
