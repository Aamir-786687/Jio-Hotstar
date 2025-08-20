import { Link } from "react-router-dom"
import { Home, Search, Film, Heart, Clapperboard, User } from "lucide-react"
import JClogo from "../../assets/jio-logo.png"
import "./sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={JClogo}  alt="JCLOGO" />
      </div>
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/" className="active" data-tooltip="Home">
              <Home />
            </Link>
          </li>
          <li>
            <Link to="/search" data-tooltip="Search">
              <Search />
            </Link>
          </li>
          <li>
            <Link to="/movies" data-tooltip="Movies">
              <Film />
            </Link>
          </li>
          <li>
            <Link to="/Shows" data-tooltip="TV Shows">
              <Clapperboard />
            </Link>
          </li>
          <li>
            <Link to="#" data-tooltip="Favorites">
              <Heart />
            </Link>
          </li>
          <li>
            <Link to="/myspace" data-tooltip="My Space">
              <User />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

