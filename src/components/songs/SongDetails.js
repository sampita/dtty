import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import "./SongDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SongDetails extends Component {
    //set the initial state
    state = {
        key: "",
        verse: "",
        chorus: "",
        bridge: "",
        writtenBy: "",
    }

    componentDidMount = () => {
        const songId = this.props.match.params.songId
        ApiManager.getSong("songs", songId)
            .then((song) => {
                console.log("song", song)
                this.setState({
                    key: song.key,
                    verse: song.chords[0].verse,
                    chorus: song.chords[0].chorus,
                    bridge: song.chords[0].bridge,
                    writtenBy: `${song.writers[0].firstName} ${song.writers[0].lastName}`,
                })
            })
    }
    
    render() {
        console.log("details this.props", this.props)
        return (
            <>
                <div>
                    <FontAwesomeIcon icon="arrow-alt-circle-left" type="button" onClick={(evt) => {this.props.updateSongAndReturnToHome(evt)}} />
                </div>
                <div>
                    <section>
                        <p><span className="boldText">Key:</span>{this.state.key}</p>
                        <p><span className="boldText">Verse:</span>{this.state.verse}</p>
                        <p><span className="boldText">Chorus:</span>{this.state.chorus}</p>
                        <p><span className="boldText">Bridge:</span>{this.state.bridge}</p>
                    </section>
                    <section>
                        <p><span className="boldText">Written By:</span>{this.state.writtenBy}</p>
                    </section>
                </div>
                <section>
                    <button id="editSongDetailsButton" onClick={() => {this.props.toggle()}}>Edit Song Details</button>
                </section>
            </>
        );
    }

}

export default SongDetails;