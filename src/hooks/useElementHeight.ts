import { type RefObject, useEffect, useState } from "react"

/**
 * Custom React hook that returns the current height of a DOM element.
 *
 * You can provide either a `ref` to the element or a `selector` string to query it.
 * The hook listens to both ResizeObserver changes and window resize events.
 *
 * @param options - An object that contains either:
 * - `ref`: a React ref to the target HTMLElement
 * - `selector`: a CSS selector string to find the target element in the DOM
 *
 * @returns The current height of the target element in pixels
 *
 * @example
 * const height = useElementHeight({ selector: ".header" });
 *
 * @example
 * const ref = useRef(null);
 * const height = useElementHeight({ ref });
 */
export const useElementHeight = (options: UseElementHeightOptions) => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const element =
      "ref" in options
        ? options.ref.current
        : document.querySelector<HTMLElement>(options.selector)

    if (!element) return

    const updateHeight = () => {
      setHeight(element.offsetHeight)
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(element)

    window.addEventListener("resize", updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateHeight)
    }
  }, [options])

  return height
}
type UseElementHeightOptions =
  | { selector: string }
  | { ref: RefObject<HTMLElement> }
