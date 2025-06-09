import { type PropsWithChildren, useEffect } from "react"
import Portal from "../Portal/Portal"
import type { ModalOverlayProps } from "./types"
import "./ModalOverlay.scss"

const ModalOverlay = ({
  children,
  isOpened,
  onClose,
  overlayClassName = "",
}: PropsWithChildren<ModalOverlayProps>) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  if (!isOpened) return null

  return (
    <Portal>
      <div className={`modal-overlay ${overlayClassName}`}>
        <div
          data-testid="modal-overlay-dimming"
          className="modal-overlay__dimming"
          role="button"
          tabIndex={0}
          onClick={onClose}
        />
        <div
          className="modal-overlay__content"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default ModalOverlay
