import React from 'react';
import Tilt from 'react-tilt';
import './MovieCard.css';

const MovieCard = ({ imageUrl, box,title,year,description,rating, metascore,likeMovie,likes,addReview,viewRev,addRating }) => {

  
  return (
    <div >

      <div className='absolute mt2 '>
      <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='800'/>
      </div>

      <br></br>

      <div className='relative'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 2 }} style={{ height: 800, width: 600 }} 
      >
        <div > Movie title: {title} </div>
        <br></br>
        <div > Movie year: {year} </div>
        <br></br>
        <div > Movie description: {description} </div>
        <br></br>
        <div  > Movie rating: {rating} </div>
        <br></br>
        <div > Movie metascore: {metascore} </div>
        <div className='Like'>
        <button
            className='w-25 grow f4 link ph3 pv2 dib white bg-blue'
            onClick={likeMovie}
          >Like</button>
        <div className='black f1'>
        {likes}
      </div>
      </div>
       <div className='Rev'>
                <label className="db fw6 lh-copy f3" htmlFor="review">Add a review</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-60"
                  type="text"
                  name="review"
                  id="review"
                />

                 

                <div className='Rev2'>
                <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Add"
                onClick={addReview}
              />
              </div>
              <div>
              <nav style={{display: 'flex', justifyContent: 'flex-start'}}>
          <p onClick={viewRev} className='f3 link dim black underline pa3 pointer'>View Reviews</p>
        </nav>
        </div>

        <div className='f3 b  black  pa3' style={{display: 'flex', justifyContent: 'flex-start'}} >
  Your Rating: 
  <input className="input-reset ba bg-transparent hover-bg-white hover-black w-10" 
  type="number" id="rating" name="quantity" min="0" max="10"/>
 <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="submit"
                onClick={addRating}
          
              />
</div>

        </div>
    </Tilt>
    </div>

    </div>
  );
}

export default MovieCard;