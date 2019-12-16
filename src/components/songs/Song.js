import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import SongDetails from "./SongDetails";
import SongDetailsEdit from "./SongDetailsEdit";
import "./Footer.css";

class SongView extends Component {
    // Sets initial state
    state = {
        editSongDetails: false,
        title: "",
        lyrics: ""
    }

    handleFieldChange = (evt) => {
        this.setState({
                [evt.target.name]: evt.target.value
            })
    }

    updateTitleandLyricsAndReturnToHome = evt => {
        const songId = this.props.match.params.songId

        const updatedTitleAndLyrics = {
            title: this.state.title,
            lyrics: this.state.lyrics
        };

        ApiManager.patch("songs", songId, updatedTitleAndLyrics)
        .then(() => this.props.history.push("/"))

    }

    toggle = () => {
        let editToggle = this.state.editSongDetails
        editToggle = editToggle ? false : true;
        this.setState({
            editSongDetails: editToggle
        })
    }

    componentDidMount() {
        const songId=this.props.match.params.songId
        ApiManager.get("songs", songId)
        .then((song) => {
            this.setState({
                title: song.title,
                lyrics: song.lyrics
            })    
        })
    }

    render() {
        return (
            <>
                <header>
                    <input
                        name="title"
                        onChange={(evt) => this.handleFieldChange(evt)}
                        value={this.state.title}></input>
                </header>
                <textarea
                    type="text"
                    name="lyrics"
                    placeholder="Write your lyrics here..."
                    onChange={(evt) => this.handleFieldChange(evt)}
                    value={this.state.lyrics}>
                </textarea>
                <footer id="songFooter">
                    {this.state.editSongDetails ? (
                        <SongDetailsEdit toggle={this.toggle} {...this.props} />
                    ) : <SongDetails toggle={this.toggle} {...this.props} title={this.state.title} lyrics={this.state.lyrics} updateSongAndReturnToHome={this.updateTitleandLyricsAndReturnToHome} />}
                </footer>
            </>
        );
    }
}

export default SongView;