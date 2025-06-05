// 'react-player/youtube' can be used for the smaller bundle size
// https://www.npmjs.com/package/react-player
import ReactPlayer from 'react-player'

// Add case for empty videoKey
const YoutubePlayer = ({ videoKey }) => (<ReactPlayer 
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
/>);

export default YoutubePlayer;