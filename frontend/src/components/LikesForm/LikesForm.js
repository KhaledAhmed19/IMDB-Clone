import React from 'react';
import Tilt from 'react-tilt';
import './LikesForm.css';

const LikesForm = ({likers,reviews,reviewers,avg }) => {
  var likersList;
  var reviewsList;
  var finalList=[];





  if(likers===null){
    likersList="No likers yet!!"
  } 
  else{
  likersList = likers.map(liker=><li key={likers.indexOf(liker)}>{liker}</li>);
  }

  if(reviews===null || reviewers===null){
    reviewsList="No reviews yet!!"
  } 
  else{
    for(var i =0;i<reviewers.length&&i<reviews.length;i++){
    finalList.push(reviewers[i]+" reviewed as: "+reviews[i]);

    
}

  reviewsList = finalList.map(review=> <li className="item" key={finalList.indexOf(review)}> {review} </li>);
  }





  
  return (
    <div >
     <div >
        <label className="db fw6 lh-copy f3" htmlFor="review">Average Rating based on Users:</label>
        <div className='black f1'>
        {avg}
      </div>
      </div>
      <Tilt className="Tilt br2 shadow-2"  options={{ max : 0 }} style={{ height: 600, width: 300 }} >
      <label className="db fw6 lh-copy f2 b underline" htmlFor="likers">Liked by: </label>
      <ol className="f3 i tl .courier">
      {likersList}
      </ol>
    </Tilt>

     <Tilt className="List1 br2 shadow-2"  options={{ max : 0 }} style={{ height: 600, width: 900 }} >
      <label className="db fw6 lh-copy f2 b underline" htmlFor="reviews">Reviews: </label>
      <ul className="List2">
      {reviewsList}
      </ul>
    </Tilt>


    </div>
  );
}

export default LikesForm;
