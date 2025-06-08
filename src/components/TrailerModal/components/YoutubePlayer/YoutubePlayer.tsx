import ReactPlayer from "react-player"
import { YOUTUBE_URL } from "./constants"
import "./YoutubePlayer.scss"

const YoutubePlayer = ({ videoKey }: YoutubePlayerProps) => (
  <ReactPlayer
    data-testid="youtube-player"
    className="youtube-player__player"
    url={`${YOUTUBE_URL}${videoKey}`}
    aria-label="YouTube video player"
    width="100%"
    height="100%"
  />
)

export default YoutubePlayer

interface YoutubePlayerProps {
  videoKey: string
}
