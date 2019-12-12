import React, { Component } from "react";
import "./SongDetails.css";

class SongDetails extends Component {
    render() {

        return (
            <>
                <section>
                    <p><span className="boldText">Key:</span>Bb</p>
                    <p><span className="boldText">Verse:</span>C Am F G</p>
                    <p><span className="boldText">Chorus:</span>G Am C Em</p>
                    <p><span className="boldText">Bridge:</span>G C G C</p>
                </section>
                <section>
                    <p><span className="boldText">Written By:</span>Author Name</p>
                </section>
                <section>
                    <button id="editSongDetailsButton" onClick={() => {this.props.toggle()}}>Edit Song Details</button>
                </section>
            </>
        );
    }

}

export default SongDetails;