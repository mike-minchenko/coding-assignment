import type { IMovie } from "../../models/movie"
import Movie from "./components/Movie/Movie"
import "./MoviesList.scss"

const MoviesList = ({ data }: MoviesListProps) => {
  return (
    <div data-testid="movies-list" className="movies-list">
      {data?.map(movie => {
        return <Movie movie={movie} key={movie.id} />
      })}
    </div>
  )
}

export default MoviesList

interface MoviesListProps {
  data: IMovie[]
}
