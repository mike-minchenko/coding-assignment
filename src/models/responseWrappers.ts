export interface SearchResponseWrapper<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TrailersResponseWrapper<T> {
  id: number
  results: T[]
}
