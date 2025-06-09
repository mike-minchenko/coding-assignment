import { FavouritesWrapper } from "components"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { starredSlice } from "store/reducers/starredSlice"

const Starred = () => {
  const starredMovies = useAppSelector(state => state.starred.starredMovies)
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useAppDispatch()

  const onRemoveAllStarredMovies = () => {
    dispatch(clearAllStarred())
  }

  return (
    <FavouritesWrapper
      data={starredMovies}
      title="Starred movies"
      removeButtonText="Remove all starred"
      emptyListText="There are no starred movies."
      onRemoveAll={onRemoveAllStarredMovies}
    />
  )
}

export default Starred
