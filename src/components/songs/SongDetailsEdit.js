import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongDetails.css";

class SongDetailsEdit extends Component {
    render() {
        console.log("edit this.props.song", this.props.song)
        return (
            <>
                <section>
                    <p className="songDetailsContainer"><span className="boldText">Key:</span>Bb
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    <p className="songDetailsContainer"><span className="boldText">Verse:</span>C Am F G
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    <p className="songDetailsContainer"><span className="boldText">Chorus:</span>G Am C Em
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                    <p className="songDetailsContainer"><span className="boldText">Bridge:</span>G C G C
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                </section>
                <section>
                    <p className="songDetailsContainer"><span className="boldText">Written By:</span>Author Name
                        <FontAwesomeIcon icon="edit" type="button" />
                    </p>
                </section>
                <section>
                    <button id="editSongDetailsButton" onClick={() => {this.props.toggle()}}>Save</button>
                </section>
            </>
        );
    }

}

export default SongDetailsEdit;