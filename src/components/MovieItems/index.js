import {Link} from 'react-router-dom'

import './index.css'

const MovieItems = props => {
  const {details} = props
  const {posterPath, title, id} = details

  return (
    <Link to={`movies/${id}`} classNme="bg-movie">
      <li>
        <img src={posterPath} alt={title} />
      </li>
    </Link>
  )
}

export default MovieItems
