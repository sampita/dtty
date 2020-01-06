import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongCard.css";
import ApiManager from '../modules/ApiManager';

class SongCard extends Component {
    state = {
        isSongSelected: false,
        hidden: true,
        tags: []
    }

    handleSelectedSongChange = (event) => {
        this.setState({
            isSongSelected: true
        })
    }

    componentDidMount = () => {
        const songId = this.props.id
        ApiManager.getItemsForSpecificSong("tags", songId).then(tagsArray => 
            this.setState({tags: tagsArray}));
    }

    render() {
        return (
            <>
                <article className="songCard" id={this.props.song.id} onClick={(e) => this.handleSelectedSongChange(e)}>
                    <div className="cardContent">
                        <section className="tagContainer">
                            {this.state.tags.map(tag =>
                            <Label key={tag.id} color='purple' horizontal>
                                {tag.tag}
                            </Label>
                            )}
                        </section>
                        <h3>{this.props.song.title}</h3>
                        <p>Last updated {this.props.song.lastUpdated}</p>
                        <p>{this.props.song.length}</p>
                    </div>
                
                {this.state.isSongSelected ? (
                    <section className="cardButtonContainer">
                        <FontAwesomeIcon icon="trash-alt" type="button" onClick={() => this.props.deleteSong(this.props.id)} />
                        <FontAwesomeIcon icon="play" type="button" />
                        <FontAwesomeIcon icon="ellipsis-h" type="button" onClick={() => {this.props.history.push(`/songs/${this.props.id}`)}} />
                </section>
                ) : null}
                {/* <div className="ui fitted divider"></div> */}
                </article>
            </>
        );
    }
}

export default SongCard;