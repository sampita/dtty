import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SongCard extends Component {
  render() {
    return (
      <article className="songCard" onClick={console.log("this card was clicked")}>
        <div className="cardContent">
          <h3>Song Title</h3>
          <p>December 10, 2019</p>
          <p>02:13</p>
          {/* <FontAwesomeIcon icon="trash-alt" type="button" /> */}
        </div>
      </article>
    );
  } 
}

export default SongCard;