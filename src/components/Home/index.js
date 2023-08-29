import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const trendingInitialState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

const originalInitialState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}
class Home extends Component {
  state = {
    trending: trendingInitialState.initial,
    original: originalInitialState.initial,
    randomList: [],
    originalList: [],
    trendingList: [],
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginalMovies()
  }

  getTrendingMovies = async () => {
    this.setState({trending: trendingInitialState.progress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const update = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trending: trendingInitialState.success,
        trendingList: update,
      })
    } else {
      this.setState({trending: trendingInitialState.failure})
    }
  }

  retryOriginal = () => {
    this.getOriginalMovies()
  }

  retryTrending = () => {
    this.getTrendingMovies()
  }

  getOriginalMovies = async () => {
    this.setState({original: originalInitialState.progress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const update = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const randomNumber = Math.floor(Math.random() * update.length)
      const randomList = update[randomNumber]
      this.setState({
        original: originalInitialState.success,
        originalList: update,
        randomList,
      })
    } else {
      this.setState({original: originalInitialState.failure})
    }
  }

  renderPosterSuccess = () => {
    const {randomList} = this.state
    const {title, overview, backdropPath} = randomList

    return (
      <div style={{backgroundImage: `url(${backdropPath})`}}>
        <Header />
        <div>
          <h1>{title}</h1>
          <p>{overview}</p>
          <button type="button">Play</button>
        </div>
      </div>
    )
  }

  renderOriginalSuccess = () => {
    const {originalList} = this.state

    return (
      <>
        <div className="container">
          <Slider className="slick" {...settings}>
            {originalList.map(each => (
              <Link to={`/movies/${each.id}`}>
                <li key={each.id}>
                  <img alt={each.title} src={each.posterPath} />
                </li>
              </Link>
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderTrendingSuccess = () => {
    const {trendingList} = this.state

    return (
      <div className="container">
        <Slider className="slick" {...settings}>
          {trendingList.map(each => (
            <Link to={`/movies/${each.id}`}>
              <li key={each.id}>
                <img alt={each.title} src={each.posterPath} />
              </li>
            </Link>
          ))}
        </Slider>
      </div>
    )
  }

  renderPosterErrorView = () => (
    <>
      <div className="error">
        <Header />
        <div className="error">
          <img
            className="warning"
            alt="failure view"
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
          />
          <p>Something went wrong. Please try again</p>
          <button onClick={this.retryOriginal} type="button">
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderOriginalErrorView = () => (
    <>
      <Header />
      <div className="error">
        <div className="error">
          <img
            alt="failure view"
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
          />
          <p className="poster-error-msg">
            Something went wrong. Please try again
          </p>
          <button onClick={this.retryOriginal} type="button">
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderTrendingErrorView = () => (
    <>
      <Header />
      <div className="error">
        <img
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button onClick={this.retryTrending} type="button">
          Try Again
        </button>
      </div>
    </>
  )

  renderPosterLoadingView = () => (
    <>
      <Header />
      <div className="error-page-container">
        <div className="error-page">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </>
  )

  renderThumbnailLoadingView = () => (
    <>
      <div className="error-page-container">
        <div className="error-page">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </>
  )

  renderOriginalsSwitchViews = () => {
    const {original} = this.state
    switch (original) {
      case originalInitialState.progress:
        return this.renderThumbnailLoadingView()
      case originalInitialState.success:
        return this.renderOriginalSuccess()
      case originalInitialState.failure:
        return this.renderOriginalErrorView()
      default:
        return null
    }
  }

  renderTrendingSwitchViews = () => {
    const {trending} = this.state
    switch (trending) {
      case trendingInitialState.loading:
        return this.renderThumbnailLoadingView()
      case trendingInitialState.success:
        return this.renderTrendingSuccess()
      case trendingInitialState.fail:
        return this.renderTrendingErrorView()
      default:
        return null
    }
  }

  renderPosterSwitchViews = () => {
    const {original} = this.state
    switch (original) {
      case originalInitialState.loading:
        return this.renderPosterLoadingView()
      case originalInitialState.success:
        return this.renderPosterSuccess()
      case originalInitialState.fail:
        return this.renderPosterErrorView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg">
        {this.renderPosterSwitchViews()}
        <h1 className="movie-section-name">Trending Now</h1>
        {this.renderTrendingSwitchViews()}
        <h1 className="movie-section-name">Originals</h1>
        {this.renderOriginalsSwitchViews()}
        <Footer />
      </div>
    )
  }
}

export default Home
