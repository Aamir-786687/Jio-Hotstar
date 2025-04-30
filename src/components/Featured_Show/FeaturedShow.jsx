import './featuredShow.css'

const FeaturedShow = (props) => {
    return (
        <>
            <div className='featuresShows'>
                <img src={props.movie.thumbnail_url} alt="Laughter Chef" />
                <div className='movieTitle'>
                {props.movie.title}
                </div>
            </div>
        </>
    )
}

export default FeaturedShow