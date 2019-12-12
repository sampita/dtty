import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongCard.css";
import ApiManager from '../modules/ApiManager';

class SongCard extends Component {
    state = {
        isSongSelected: false,
        // selectedSongId: null
    }

    handleSelectedSongChange = (event) => {
        const target = event.target
        console.log("event.target", target)
        this.setState({
            isSongSelected: true
            // selectedSongId: event.target.id
        })
    }

    render() {
        console.log("songcard props", this.props)

        return (
            <>
                <article className="songCard" id={this.props.song.id} onClick={(e) => this.handleSelectedSongChange(e)}>
                    <div className="cardContent">
                        <h3>{this.props.song.title}</h3>
                        <p>Last updated {this.props.song.lastUpdated}</p>
                        <p>{this.props.song.length}</p>
                    </div>
                
                {this.state.isSongSelected ? (
                    <section className="cardButtonContainer">
                        <FontAwesomeIcon icon="trash-alt" type="button" />
                        <FontAwesomeIcon icon="play" type="button" />
                        <FontAwesomeIcon icon="ellipsis-h" type="button" />
                </section>
                ) : null}
                </article>
            </>
        );
    }
}

export default SongCard;