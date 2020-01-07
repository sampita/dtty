import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import "./SongDetails.css";
import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SongDetails extends Component {
    //set the initial state
    state = {
        key: "",
        verse: "",
        chorus: "",
        bridge: "",
        writersId: "",
        writers: []
    }

    componentDidMount = () => {
        const songId = this.props.match.params.songId
        ApiManager.getSong(songId)
            .then((song) => {
                this.setState({
                    key: song.key,
                    verse: song.chords[0].verse,
                    chorus: song.chords[0].chorus,
                    bridge: song.chords[0].bridge,
                    writersId: song.writers[0].id
                })
            });
         ApiManager.getItemsForSpecificSong("writers", songId).then(writersArray => 
                this.setState({writers: writersArray}));
    }
    
    render() {

        return (
            <>
                <div>
                    <div className="ui equal width grid">
                        <div className="column" id="backButtonColumn">
                            <FontAwesomeIcon icon="arrow-alt-circle-left" type="button"
                            id="backButton" onClick={(evt) => {this.props.updateSongAndReturnToHome(evt)}} />
                        </div>
                        <section className="column">
                            <div><span className="boldText">Key:</span>{this.state.key}</div>
                            <div><span className="boldText nextLine">Verse:</span>{this.state.verse}</div>
                            <div><span className="boldText nextLine">Chorus:</span>{this.state.chorus}</div>
                            <div><span className="boldText nextLine">Bridge:</span>{this.state.bridge}</div>
                        </section>
                        <section className="column">
                            <span className="boldText">Written By:
                            </span>
                            {this.state.writers.map(writer =>
                                <div key={writer.id} value={writer.id}>
                                    {writer.firstName} {writer.lastName}
                                </div>
                            )}
                        </section>
                    </div>
                    <section className="flexContainer">
                        <button id="editSongDetailsButton" onClick={() => {this.props.toggle()}}>Edit Song Details</button>
                    </section>
                </div>
            </>
        );
    }

}

export default SongDetails;