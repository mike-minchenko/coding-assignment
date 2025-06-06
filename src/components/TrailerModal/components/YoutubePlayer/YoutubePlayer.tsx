import ReactPlayer from "react-player"
import { YOUTUBE_URL } from "./constants"

const YoutubePlayer = ({ videoKey }: YoutubePlayerProps) => (
  <ReactPlayer
    data-testid="youtube-player"
    className="youtube-palyer"
    url={`${YOUTUBE_URL}${videoKey}`}
    controls={true}
    playing={true}
  />
)

export default YoutubePlayer

interface YoutubePlayerProps {
  videoKey: string
}
