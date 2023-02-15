import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <Link to="/">
    <div className="Header-app-container">
      <div className="header-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </div>
    </div>
  </Link>
)

export default withRouter(Header)
