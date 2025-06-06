import ModalOverlay from "./components/ModalOverlay/ModalOverlay"
import type { PropsWithChildren } from "react"
import "./Modal.scss"
import type { ModalProps } from "./types"

const Modal = ({
  children,
  isOpened,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  return (
    <ModalOverlay isOpened={isOpened} onClose={onClose}>
      <div className="simple-modal">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="bi bi-x-circle" aria-hidden={true} />
        </button>
        {children}
      </div>
    </ModalOverlay>
  )
}

export default Modal
