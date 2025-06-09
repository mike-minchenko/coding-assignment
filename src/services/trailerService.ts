import type { TrailersResponseWrapper } from "models/responseWrappers"
import type { Video } from "models/video"

import { API_KEY, ENDPOINT } from "../shared/constants"

export const getVideos = async (
  id: number,
): Promise<TrailersResponseWrapper<Video>> => {
  const URL = `${ENDPOINT}/movie/${id}/videos?api_key=${API_KEY}`
  const response = await fetch(URL)
  return await response.json()
}
