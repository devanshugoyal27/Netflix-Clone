import React from 'react'

const MovieTrailer = ({movieTrailer}) => {
  return (
    <div>
       <div className='px-4 py-7 '>
              <iframe
          className="lg:w-[400px] lg:h-[250px] w-[300px] h-[170px] rounded-md"
          src={`https://www.youtube.com/embed/${movieTrailer?.key}/`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
        </div>
    </div>
  )
}

export default MovieTrailer
