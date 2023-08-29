import {Component} from 'react'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const initialState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {moviesList: [], apiStatus: initialState.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: initialState.progress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const genresList = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const similarMoviesList = data.movie_details.similar_movies.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const spokenLanguagesList = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          englishName: each.english_name,
        }),
      )
      const update = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: genresList,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: similarMoviesList,
        spokenLanguages: spokenLanguagesList,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({apiStatus: initialState.success, moviesList: update})
    } else {
      this.setState({apiStatus: initialState.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/failure_img_vggqi4.svg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getPopularMovies}>
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {moviesList} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = moviesList

    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const time = `${hours}h ${minutes}m`
    const certificate = adult ? 'A' : 'U/A'
    const year = format(new Date(releaseDate), 'yyyy')
    const releaseDateFormat = format(new Date(releaseDate), 'do MMMM yyyy')

    return (
      <div className="bg-detail">
        <div style={{backgroundImage: `url(${backdropPath})`}}>
          <Header />
          <h1 className="h1">{title}</h1>
          <div className="detail-card2">
            <p>{time}</p>
            <p className="box">{certificate}</p>
            <p>{year}</p>
          </div>
          <p>{overview}</p>
          <button type="button">Play</button>
        </div>
        <div className="detail-card">
          <div>
            <h1>Genres</h1>
            <ul>
              {genres.map(each => (
                <li key={each.id}>
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Audio Available</h1>
            <ul>
              {spokenLanguages.map(each => (
                <li key={each.id}>
                  <p>{each.englishName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Rating Count</h1>
            <p>{voteCount}</p>
            <h1>Rating Average</h1>
            <p>{voteAverage}</p>
          </div>
          <div>
            <h1>Budget</h1>
            <p>{budget}</p>
            <h1>Release Date</h1>
            <p>{releaseDateFormat}</p>
          </div>
        </div>
        <div>
          <h1 className="h1">More like this</h1>
          <ul>
            {similarMovies.map(each => (
              <li key={each.id}>
                <img src={each.posterPath} alt={each.title} />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialState.progress:
        return this.renderLoaderView()
      case initialState.failure:
        return this.renderFailure()
      case initialState.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return <div classNme="bg-detail">{this.renderSwitch()}</div>
  }
}

export default MovieDetails
