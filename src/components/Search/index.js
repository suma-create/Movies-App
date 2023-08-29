import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieItems from '../MovieItems'

import './index.css'

const initialState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {searchList: [], apiStatus: initialState.initial, searchValue: ''}

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async searchValue => {
    this.setState({apiStatus: initialState.progress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`,
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
        searchList: update,
        apiStatus: initialState.success,
        searchValue,
      })
    } else {
      this.setState({apiStatus: initialState.failure})
    }
  }

  renderSuccess = () => {
    const {searchList} = this.state
    return searchList.length > 0 ? (
      <ul>
        {searchList.map(each => (
          <MovieItems key={each.id} details={each} className="bg-item" />
        ))}
      </ul>
    ) : (
      this.failureView()
    )
  }

  failureView = () => {
    const {searchValue} = this.state

    return (
      <div>
        <img
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
          alt="no movies"
        />
        <p>Your search for {searchValue} did not find any matches.</p>
      </div>
    )
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
      <button type="button" onClick={this.getSearchMovies}>
        Try Again
      </button>
    </div>
  )

  renderView = () => {
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
    return (
      <div className="bg-search">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default Search
