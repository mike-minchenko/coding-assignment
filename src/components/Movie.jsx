import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

const Movie = ({ movie, viewTrailer, closeCard }) => {
    // Selecting entire state causes unnecessary re-renders
    // This selector will trigger component re-render whenever ANY part of state changes
    const state = useSelector((state) => state)
    // BETTER: Use specific memoized selectors
    // const isStarred = useSelector(state => state.starred.starredMovies.some(m => m.id === movie.id))
    // const isInWatchLater = useSelector(state => state.watchLater.watchLaterMovies.some(m => m.id === movie.id))
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const dispatch = useDispatch()

    const myClickHandler = (e) => {
        if (!e) var e = window.event // Ancient IE fallback - remove this
        e.cancelBubble = true        // IE-specific property - use stopPropagation()
        if (e.stopPropagation) e.stopPropagation()
        // Use React state instead of DOM manipulation
        e.target.parentElement.parentElement.classList.remove('opened')
    }

    //the names of custom classes in the component do not make logical sense.
    // - Consider renaming the classes according to the name of the component.
    // - Also use a separate style file for the component

    return (
        // consider <article> for movie card
        <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
        {/*Use React state instead of DOM manipulation*/}
        <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')} >
            <div className="card-body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    {/*Use <p> instead of <div> for text content*/}
                    <div className="overview">{movie.overview}</div>
                    {/*Year could be wrapped in <time> element with datetime attribute*/}
                    <div className="year">{movie.release_date?.substring(0, 4)}</div>
                    {/*.map() executes on every render. Use selectors*/}
                    {!starred.starredMovies.map(movie => movie.id).includes(movie.id) ? (
                        // Use <button> instead of <span>
                        // aria-label="Add to starred movies"
                        <span className="btn-star" data-testid="starred-link" onClick={() =>
                            // This payload structure is repeated multiple times
                            // Extract to utility function or just pass the entire movie object
                            dispatch(starMovie({
                                id: movie.id,
                                overview: movie.overview,
                                //Unnecessary manipulation
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                            })
                        )}>
                            {/*aria-hidden=true*/}
                            <i className="bi bi-star" />
                        </span>
                    ) : (
                      // Use <button> instead of <span>
                      // aria-label="Remove from starred movies
                        <span className="btn-star" data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                            {/*aria-hidden=true*/}
                            <i className="bi bi-star-fill" data-testid="star-fill" />
                        </span>
                    )}
                    {/*.map() executes on every render. Use selectors*/}
                    {!watchLater.watchLaterMovies.map(movie => movie.id).includes(movie.id) ? (
                        <button type="button" data-testid="watch-later" className="btn btn-light btn-watch-later"
                                onClick={() =>
                                // This payload structure is repeated multiple times
                                // Extract to utility function or just pass the entire movie object
                                dispatch(addToWatchLater({
                                id: movie.id,
                                overview: movie.overview,
                                //Unnecessary manipulation
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                        }))}>Watch Later</button>
                    ) : (
                        //aria-label="Remove from watch later"
                        <button type="button" data-testid="remove-watch-later" className="btn btn-light btn-watch-later blue" onClick={() => dispatch(removeFromWatchLater(movie))}>
                            {/*aria-hidden=true*/}
                            <i className="bi bi-check"></i>
                        </button>
                    )}
                    <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>
                </div>
                {/*
                - alt text can be more descriptive
                - URL constant can be on the top level
                */}
                <img className="center-block" src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
            </div>
            {/*
            - Why duplicate titles? Could be handled with CSS
            - <h6> is semantically incorrect
            */}
            <h6 className="title mobile-card">{movie.title}</h6>
            <h6 className="title">{movie.title}</h6>
            <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>        
    )
}

export default Movie