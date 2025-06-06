import { useAppSelector } from "../../store/hooks"
import Movie from "./Movie"
import "./Movies.scss"

const Movies = ({ viewTrailer, closeCard }) => {
  const movies = useAppSelector(state => state.movies.movies)

  console.log(movies)
  return (
    <div data-testid="movies">
      {movies?.results?.map(movie => {
        return <Movie movie={movie} key={movie.id} closeCard={closeCard} />
      })}
    </div>
  )
}

export default Movies
