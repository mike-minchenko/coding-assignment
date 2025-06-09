import type { PropsWithChildren } from "react"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import type { ModalOverlayProps } from "../ModalOverlay/types"
import classes from "./Modal.module.scss"

const Modal = ({
  children,
  isOpened,
  onClose,
  overlayClassName = "",
  className = "",
}: PropsWithChildren<ModalProps>) => {
  return (
    <ModalOverlay
      isOpened={isOpened}
      onClose={onClose}
      overlayClassName={overlayClassName}
    >
      <div className={`${classes["modal"]} ${className}`}>
        <button
          className={classes["modal-close"]}
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="bi bi-x" aria-hidden="true" />
        </button>
        {children}
      </div>
    </ModalOverlay>
  )
}

export default Modal

interface ModalProps extends ModalOverlayProps {
  className?: string
}
