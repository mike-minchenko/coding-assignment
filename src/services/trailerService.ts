import { API_KEY, ENDPOINT } from "../shared/constants"

export const getVideos = async (id: string) => {
  const URL = `${ENDPOINT}/movie/${id}/videos?api_key=${API_KEY}`
  const response = await fetch(URL)
  return await response.json()
}
