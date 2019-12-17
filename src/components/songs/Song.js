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
        // step 1: save Audio to Firebase
        const recorder = document.getElementById('recorder');
        const player = document.getElementById('player');
        const file = evt.target.files[0];
        const url = URL.createObjectURL(file)

        // var storageRef = firebase.storage().ref();
        // var audioRef = storageRef.child('audio');

        const audioRef = firebase.storage().ref('audio');
        const childRef = audioRef.child(`song-${this.state.songId}-user-${this.state.userId}`);

        childRef.put(this.state.audio)

        // step 2: get url from firebase


        console.log("url", url)
        player.src = url;



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
        const userId=localStorage.getItem("user")
        ApiManager.get("songs", songId)
        .then((song) => {
            this.setState({
                title: song.title,
                lyrics: song.lyrics,
            })    
        })

        this.setState({
            userId: userId,
            songId: songId
        })
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
                <section>
                    <input type="file" accept="audio/*" capture id="recorder"onChange={(evt) => this.audioFileHandler(evt)}/>
                    <audio id="player" controls></audio>
                </section>
                <div className="lyricsTextArea paper">
                    <div className="lines">
                <TextareaAutosize
                    type="text"
                    name="lyrics"
                    className="lyricsTextBox text"
                    placeholder="Write your lyrics here..."
                    onChange={(evt) => this.handleFieldChange(evt)}
                    onResize={(e) => {}}
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