import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongCard.css";

class SongCard extends Component {
    state = {
        isSongSelected: false,
    }

    handleSelectedSongChange = (event) => {
        this.setState({
            isSongSelected: true
        })
    }

    render() {
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
                        <FontAwesomeIcon icon="trash-alt" type="button" onClick={() => this.props.delete(this.props.id)} />
                        <FontAwesomeIcon icon="play" type="button" />
                        <FontAwesomeIcon icon="ellipsis-h" type="button" onClick={() => {this.props.history.push(`/songs/${this.props.id}`)}} />
                </section>
                ) : null}
                <div className="ui fitted divider"></div>
                </article>
            </>
        );
    }
}

export default SongCard;