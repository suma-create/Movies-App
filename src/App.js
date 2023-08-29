import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Popular from './components/Popular'
import Account from './components/Account'
import Home from './components/Home'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute path="/movies/:id" exact component={MovieDetails} />
    <Route component={NotFound} />
  </Switch>
)
export default App
