import type { IMovie } from "models/movie"
import type { SearchResponseWrapper } from "models/responseWrappers"
import type { SearchFilter } from "models/searchFilter"
import { API_KEY, ENDPOINT } from "shared/constants"

export const getMovies = async ({
  queryString = "",
  page = 1,
}: GetMoviesParams): Promise<SearchResponseWrapper<IMovie>> => {
  const isSearch = !!queryString?.trim()
  const baseURL = isSearch
    ? `${ENDPOINT}/search/movie`
    : `${ENDPOINT}/discover/movie`

  const params = new URLSearchParams()

  params.set("api_key", API_KEY)
  params.set("page", page.toString())

  if (isSearch) {
    params.set("query", queryString)
  } else {
    params.set("sort_by", "vote_count.desc")
  }

  const URL = `${baseURL}?${params.toString()}`
  const response = await fetch(URL)
  return await response.json()
}

interface GetMoviesParams {
  queryString?: SearchFilter["search"]
  page?: number
}
