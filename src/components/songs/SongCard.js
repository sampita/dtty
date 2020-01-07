import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongCard.css";
import ApiManager from '../modules/ApiManager';
import moment from 'moment';


class SongCard extends Component {
    state = {
        isSongSelected: false,
        tags: []
    }

    handleSelectedSongChange = (event) => {
        let toggleSelectedSong = this.state.isSongSelected
        toggleSelectedSong = toggleSelectedSong ? false : true;
        this.setState({
            isSongSelected: toggleSelectedSong
        })
    }


    componentDidMount = () => {
        const songId = this.props.id
        ApiManager.getItemsForSpecificSong("tags", songId).then(tagsArray =>
            this.setState({ tags: tagsArray }));
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
                        <h3 className="songCardTitle">{this.props.song.title}</h3>
                        <p className="lastUpdatedText">Last updated {moment(this.props.song.lastUpdated).format("MMMM D, YYYY")}</p>
                        <p>{this.props.song.length}</p>
                    </div>

                    {this.state.isSongSelected ? (
                        <div>
                            <div id="audioFlexContainer">
                            <audio
                                id="player"
                                controls
                                src={this.props.song.audio}
                            >
                            </audio>
                            </div>
                        <section className="cardButtonContainer">
                            <FontAwesomeIcon icon="trash-alt" type="button" onClick={() => this.props.deleteSong(this.props.id)} />
                            <FontAwesomeIcon icon="play" type="button" onClick={() => document.getElementById('player').play()}/>
                            <FontAwesomeIcon icon="ellipsis-h" type="button" onClick={() => { this.props.history.push(`/songs/${this.props.id}`) }} />
                        </section>
                        </div>
                    ) : null}
                </article>
            </>
        );
    }
}

export default SongCard;