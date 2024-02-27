import React from 'react'
import MovieCard from './MovieCard'


const MoviesList = ({title,movies}) => {

  return (
    <div className='pl-5 lg:my-14 my-4 '>
      <h1 className=' text-white font-semibold md:text-xl text-lg mb-2 md:my-6 lg:my-0'>{title}</h1>
      <div className=''>
         <MovieCard movies={movies}/>
      </div>
     
    </div>
  )
}

export default MoviesList
