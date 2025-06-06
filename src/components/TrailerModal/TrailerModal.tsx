import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { trailerSlice } from "../../store/reducers/trailerSlice"
import Modal from "../Modal/Modal"
import NoTrailerMessage from "./components/NoTrailerMessage/NoTrailerMessage"
import YoutubePlayer from "./components/YoutubePlayer/YoutubePlayer"

const TrailerModal = () => {
  const isOpened = useAppSelector(state => state.trailer.isOpened)
  const videoKey = useAppSelector(state => state.trailer.videoKey)
  const { closeTrailerModal } = trailerSlice.actions
  const dispatch = useAppDispatch()

  const closeModal = () => {
    dispatch(closeTrailerModal())
  }

  if (!videoKey) {
    return (
      <Modal isOpened={isOpened} onClose={closeModal}>
        <NoTrailerMessage />
      </Modal>
    )
  }

  return (
    <Modal isOpened={isOpened} onClose={closeModal}>
      <YoutubePlayer videoKey={videoKey} />
    </Modal>
  )
}

export default TrailerModal
