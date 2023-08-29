import Cookies from 'js-cookie'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const Account = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <div className="bg-color-account">
        <Header />
        <div>
          <h1>Account</h1>
          <hr />
          <div>
            <p>Member ship</p>
            <div>
              <p>rahul@gmail.com</p>
              <p>Password</p>
              <span>: ************</span>
            </div>
          </div>
          <hr />
          <div>
            <p>Plan details </p>
            <p>Premium </p>
            <p>Ultra HD</p>
          </div>
          <hr />
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Account
