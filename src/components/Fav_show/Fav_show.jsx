import FeaturedShow from "../Featured_Show/FeaturedShow";
import "./fav_show.css";
import {Link} from 'react-router-dom'

const Fav_show = (props) => {
  return (
    <section className="fav">
      <h1 className="title">{props.title}</h1>

      <div className="shows">
        {props.movies?.map((movie) => (
          <Link key={movie.id} to={`/watch/${movie.id}`}>
            <FeaturedShow movie={movie} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Fav_show;
