import { useCallback } from "react"
import { getVideos } from "services/trailerService"
import { useAppDispatch } from "store/hooks"
import { trailerSlice } from "store/reducers/trailerSlice"

/**
 * Custom hook to fetch and display a trailer modal for a movie by its ID.
 *
 * Fetches available video data using `getVideos`, selects the first trailer-type video
 * (or the first available video if no trailer is found), and dispatches an action to open the modal.
 *
 * @returns {Object} An object with a single method:
 * @returns {Function} viewTrailer - Accepts a movie ID and shows the trailer modal if available.
 *
 * @example
 * const { viewTrailer } = useViewTrailer()
 * await viewTrailer('12345')
 */
export const useViewTrailer = (): UseViewTrailerReturn => {
  const dispatch = useAppDispatch()
  const { openTrailerModal } = trailerSlice.actions

  const viewTrailer = useCallback(
    async (id: number) => {
      const videos = await getVideos(id)

      if (videos.results.length) {
        const trailer = videos.results.find(vid => vid.type === "Trailer")
        const trailerKey = trailer ? trailer.key : videos.results[0].key
        dispatch(openTrailerModal(trailerKey))
      } else {
        dispatch(openTrailerModal(null))
      }
    },
    [dispatch, openTrailerModal],
  )

  return { viewTrailer }
}

interface UseViewTrailerReturn {
  /**
   * Fetches trailer video and triggers modal open.
   * @param {number} id - The movie ID for which to fetch trailer videos.
   * @returns {Promise<void>}
   */
  viewTrailer: (id: number) => Promise<void>
}
