import { FavouritesWrapper } from "components"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { watchLaterSlice } from "store/reducers/watchLaterSlice"

const WatchLater = () => {
  const watchLaterMovies = useAppSelector(
    state => state.watchLater.watchLaterMovies,
  )
  const { removeAllWatchLater } = watchLaterSlice.actions
  const dispatch = useAppDispatch()

  const onRemoveAllStarredMovies = () => {
    dispatch(removeAllWatchLater())
  }

  return (
    <FavouritesWrapper
      data={watchLaterMovies}
      title="Watch Later List"
      removeButtonText="Empty list"
      emptyListText="You have no movies saved to watch later."
      onRemoveAll={onRemoveAllStarredMovies}
    />
  )
}

export default WatchLater
