import "./NoTrailerMessage.scss"

const NoTrailerMessage = () => {
  return (
    <div className="no-trailer-message">
      <p
        className="no-trailer-message__text"
        aria-live="polite"
        data-testid="no-trailer-message"
      >
        No trailer available. Try another movie
      </p>
    </div>
  )
}

export default NoTrailerMessage
