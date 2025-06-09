import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import ModalOverlay from "../ModalOverlay"

describe("ModalOverlay test", () => {
  it("does not render when isOpened is false", () => {
    const onClose = vi.fn()
    const { container } = render(
      <ModalOverlay isOpened={false} onClose={onClose}>
        <div>Modal content</div>
      </ModalOverlay>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it("renders children when isOpened is true", () => {
    const onClose = vi.fn()
    render(
      <ModalOverlay isOpened={true} onClose={onClose}>
        <div>Modal content</div>
      </ModalOverlay>,
    )
    expect(screen.getByText("Modal content")).toBeInTheDocument()
  })

  it("calls onClose when clicking on the dimming background", async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <ModalOverlay isOpened={true} onClose={onClose}>
        <div>Content</div>
      </ModalOverlay>,
    )

    const overlay = screen.getByTestId("modal-overlay-dimming")
    await user.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when pressing Escape key", async () => {
    const onClose = vi.fn()
    render(
      <ModalOverlay isOpened={true} onClose={onClose}>
        <div>Content</div>
      </ModalOverlay>,
    )

    const escEvent = new KeyboardEvent("keydown", { key: "Escape" })
    window.dispatchEvent(escEvent)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
