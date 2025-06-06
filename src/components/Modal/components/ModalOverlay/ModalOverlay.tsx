import type { PropsWithChildren } from "react"
import Portal from "../../../Portal/Portal"
import "./ModalOverlay.scss"
import type { ModalProps } from "../../types"

const ModalOverlay = ({
  children,
  isOpened,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  if (!isOpened) return null

  return (
    <Portal>
      <div className="modal-overlay__container" role="dialog">
        <div
          className="modal-overlay__dimming"
          role="button"
          tabIndex={0}
          aria-hidden={true}
          onClick={onClose}
        />
        <div className="modal-overlay__content" tabIndex={-1}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default ModalOverlay
