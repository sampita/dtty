import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SongCard extends Component {
  render() {
    return (
      <article className="songCard" onClick={() => console.log("this card was clicked")}>
        <div className="cardContent">
          <h3>{this.props.song.title}</h3>
          <p>Last updated {this.props.song.lastUpdated}</p>
          <p>{this.props.song.length}</p>
          <FontAwesomeIcon icon="trash-alt" type="button" />
        </div>
      </article>
    );
  } 
}

export default SongCard;