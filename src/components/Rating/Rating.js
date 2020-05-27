import React from 'react';
import './Rating.css';

//component that displays the stars according to the rating
export default function Rating(props) {
  const stars = [0,0,0,0,0]
    .map((_, i) => i < props.value
      ? <span key={i}>&#9733;</span>
      : <span key={i}>&#9734;</span>
    );
  return (
    <div className="rating">
      {stars}
      <p>{props.value} stars</p>
    </div>
  );
}