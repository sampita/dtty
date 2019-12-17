import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import SongDetails from "./SongDetails";
import SongDetailsEdit from "./SongDetailsEdit";
import TextareaAutosize from 'react-autosize-textarea';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import "./Song.css";
import "./Footer.css";

class SongView extends Component {
    // Sets initial state
    state = {
        userId: "",
        editSongDetails: false,
        title: "",
        lyrics: "",
        audio: null
    }

    handleFieldChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    audioFileHandler = (evt) => {
        // const player = document.getElementById('player');
        // const recorder = document.getElementById('recorder');
        const file = evt.target.files[0];
        const songId = this.props.match.params.songId
        const audioRef = firebase.storage().ref('audio');
        const childRef = audioRef.child(`song-${this.state.songId}-user-${this.state.userId}`);

    // step 1: save audio to Firebase
        childRef.put(file)
    // step 2: get url from firebase
        .then(response => response.ref.getDownloadURL())
    // step 3: save everything to json server
        .then(downloadUrl => {
                const newAudioURL = {
                    audio: downloadUrl
                }
                return ApiManager.patch("songs", songId, newAudioURL)
        })
    // step 4: update state with new audio file url
        .then((patchedSong) => {
            console.log("patchedSong", patchedSong)
            this.setState({
                audio: patchedSong.audio
            })
        })
    }

    getUpdatedSongInfo() {
    const songId = this.props.match.params.songId
    const userId = localStorage.getItem("user")
        ApiManager.get("songs", songId)
            .then((song) => {
                this.setState({
                    title: song.title,
                    lyrics: song.lyrics,
                    audio: song.audio,
                    songId: song.id,
                    userId: userId
                })
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
        this.getUpdatedSongInfo()
    }

    render() {
        return (
            <>
                <header>
                    <input
                        name="title"
                        id="songTitle"
                        onChange={(evt) => this.handleFieldChange(evt)}
                        value={this.state.title}></input>
                </header>
                <section id="audioContainer">
                    <input
                        type="file"
                        accept="audio/*"
                        capture
                        id="recorder"
                        onChange={(evt) => this.audioFileHandler(evt)} />
                    <audio
                        id="player"
                        controls
                        src={this.state.audio}
                    >
                    </audio>
                </section>
                <div className="lyricsTextArea paper">
                    <div className="lines">
                        <TextareaAutosize
                            type="text"
                            name="lyrics"
                            className="lyricsTextBox text"
                            placeholder="Write your lyrics here..."
                            onChange={(evt) => this.handleFieldChange(evt)}
                            onResize={(e) => { }}
                            value={this.state.lyrics}>
                        </TextareaAutosize>
                    </div>
                </div>
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