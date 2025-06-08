import { useEffect } from "react"

/**
 * Custom hook for infinite scroll functionality.
 * Triggers a callback when the user scrolls near the bottom of the page.
 *
 * @param callback - Function to call when threshold is reached
 * @param isLoading - Whether data is currently being loaded
 * @param hasMore - Whether there is more data to load
 * @param threshold - Distance in pixels from the bottom to trigger the callback (default: 200)
 */
export const useInfiniteScroll = ({
  callback,
  isLoading,
  hasMore,
  threshold = 200,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (fullHeight - (scrollTop + windowHeight) < threshold) {
        callback()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [callback, isLoading, hasMore, threshold])
}

interface UseInfiniteScrollProps {
  callback: () => void
  isLoading: boolean
  hasMore: boolean
  threshold?: number
}
