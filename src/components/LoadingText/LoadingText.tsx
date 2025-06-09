import "./LoadingText.scss"

const LoadingText = ({
  text = "Loading ...",
  className = "",
}: LoadingTextProps) => {
  return (
    <div className={`${className} loading-text`} aria-live="polite">
      <span>{text}</span>
    </div>
  )
}

export default LoadingText

interface LoadingTextProps {
  text?: string
  className?: string
}
