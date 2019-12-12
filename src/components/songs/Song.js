import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SongView extends Component {

    render() {

        return (
            <>
                <h1>My Untitled Song</h1>
                <input type="text" name="lyricsInput" value="This is my text area.">
                </input>
            </>
        );
    }
}

export default SongView;