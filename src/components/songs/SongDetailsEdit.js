import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongDetails.css";

class SongDetailsEdit extends Component {
    //set the initial state
    state = {
        key: "",
        verse: "",
        chorus: "",
        bridge: "",
        writtenBy: "",
        chordsId: ""
    }

    saveChangesAndToggleView = evt => {
        const songId = this.props.match.params.songId
        const chordsId = this.state.chordsId

        const updatedKey = {
            key: this.state.key
        };
        const updatedChords = {
            verse: this.state.verse,
            chorus: this.state.chorus,
            bridge: this.state.bridge
        };

        ApiManager.patch("songs", songId, updatedKey)
        .then(ApiManager.patch("chords", chordsId, updatedChords));

        this.props.toggle();
    }

    handleFieldChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    componentDidMount() {
        const songId = this.props.match.params.songId
        ApiManager.getSong("songs", songId)
            .then((song) => {
                this.setState({
                    key: song.key,
                    verse: song.chords[0].verse,
                    chorus: song.chords[0].chorus,
                    bridge: song.chords[0].bridge,
                    writtenBy: `${song.writers[0].firstName} ${song.writers[0].lastName}`,
                    chordsId: song.chords[0].id
                })
            })
    }

    render() {
        return (
            <>
                <section>
                    <p
                        className="songDetailsContainer boldText">Key:
                        <input
                            type="text"
                            name="key"
                            value={this.state.key}
                            onChange={(evt) => this.handleFieldChange(evt)}
                        >
                        </input>
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    <p
                        className="songDetailsContainer boldText">Verse:
                        <input
                            type="text"
                            name="verse"
                            value={this.state.verse}
                            onChange={(evt) => this.handleFieldChange(evt)}
                        >
                        </input>
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    <p
                        className="songDetailsContainer boldText">Chorus:
                        <input
                            type="text"
                            name="chorus"
                            value={this.state.chorus}
                            onChange={(evt) => this.handleFieldChange(evt)}
                        >
                        </input>
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    <p
                        className="songDetailsContainer boldText">Bridge:
                        <input
                            type="text"
                            name="bridge"
                            value={this.state.bridge}
                            onChange={(evt) => this.handleFieldChange(evt)}
                        >
                        </input>
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                </section>
                <section>
                    <p>
                        <span className="songDetailsContainer boldText">Written By:
                        </span>
                        <span>{this.state.writtenBy}</span>
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    {/* hidden Add Writer input field here?? */}
                </section>
                <section>
                    <button id="editSongDetailsButton" onClick={() => { this.saveChangesAndToggleView() }}>Save</button>
                </section>
            </>
        );
    }

}

export default SongDetailsEdit;