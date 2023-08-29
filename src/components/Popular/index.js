import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import MovieItems from '../MovieItems'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const initialState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {popularList: [], apiStatus: initialState.initial}

  componentDidMount() {
    this.getPopularList()
  }

  getPopularList = async () => {
    this.setState({apiStatus: initialState.progress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
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
      this.setState({apiStatus: initialState.success, popularList: update})
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
      <button type="button" onClick={this.getPopularList}>
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {popularList} = this.state

    return (
      <>
        <ul>
          {popularList.map(each => (
            <MovieItems details={each} key={each.id} />
          ))}
        </ul>
      </>
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
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-popular">
        <Header />
        {this.renderSwitch()}
        <Footer />
      </div>
    )
  }
}

export default Popular
