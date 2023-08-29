import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {searchValue: ''}

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  /*
  onSearch = () => {
    const {getSearchMovies} = this.props
    const {searchValue} = this.state
    if (searchValue !== '') {
      getSearchMovies(searchValue)
    }
  }
  */

  render() {
    const {searchValue} = this.state

    return (
      <div>
        <div className="card">
          <Link to="/">
            <img
              className="logo"
              src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660479354/Group_7399_nn7x3u.png"
              alt="website logo"
            />
          </Link>
          <ul className="unorder">
            <Link to="/" className="list">
              <li>Home</li>
            </Link>
            <br />
            <Link to="/popular" className="list">
              <li>Popular</li>
            </Link>
          </ul>
          <div className="card">
            <input
              className="input"
              type="search"
              placeholder="search"
              value={searchValue}
              onChange={this.onChangeSearch}
            />
            <Link to="/search">
              <button
                className="button input"
                onClick={this.onSearch}
                testid="searchButton"
                type="button"
              >
                <HiOutlineSearch />
              </button>
            </Link>
            <Link to="/account">
              <img
                className="avatar"
                alt="profile"
                src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
              />
            </Link>
            <button className="button input" type="button">
              <MdMenuOpen className="hamburger icons" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
