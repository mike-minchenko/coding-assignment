import { useState, useEffect } from "react"

/**
 * Custom React hook that debounces a value.
 * Returns the latest value after the specified delay has passed without changes.
 *
 * @template T - The type of the value to debounce
 * @param value - The input value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns {T} - The debounced value
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
