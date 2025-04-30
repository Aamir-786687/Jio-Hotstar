import { useState } from 'react'
import './tags.css'

const Tags = () => {

    let [tags, setTags] = useState([
        "Action", "Comedy", "Horror", "Thriller",
        "Sci-Fi", "Romance", "Fantasy", "Mystery", "Adventure",
        "Animation", "Crime", "Documentary", "Family", "Musical",
        "War", "Western", "Sports"
    ])

    return (
        <>
            <div className='tags'>

                {/* {
                    tags.map((tag) => {
                        return <button className='tag'> {tag}</button>
                    })
                } */}

                {tags.map((tag, index) => (
                    <button className='tag'key={index}>{tag}</button>
                ))}


            </div>
        </>
    )
}

export default Tags