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
        audio: null,
        chunks: [],
        recordingStatus: false
    }

    handleFieldChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
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

    audioFileHandler = (evt) => {
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
                ApiManager.patch("songs", songId, newAudioURL)
            })
            // step 4: update state with new audio file url
            .then(() => {this.getUpdatedSongInfo()})
    }

    //recorder()
    recordAudioStream = () => {
        let audio = new MediaRecorder(this.state.audio)
        audio.ondataavailable = (e) => {
            let chunksFromAudioStream = []
            chunksFromAudioStream.push(e.data)
            this.setState({
                chunks: chunksFromAudioStream
            })
        }
        console.log("this.state.chunks", this.state.chunks)

    }
    
    getUserMedia = (e) => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia (
               // Constraints - only audio needed for this app
               {
                  audio: true
               })
               
    // *********** Success callback ***************
               .then(function(stream) {
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                    console.log("recorder started");
                
                })
                // Collect audio data as recording progesses
                mediaRecorder.ondataavailable = (e) => {
                    this.setState({
                    chunks: e.data,
                    recordingStatus: true
                })
            }
    // ********************************************     

               // Error callback
               .catch(function(err) {
                  console.log('The following getUserMedia error occured: ' + err);
               }
            );
         } else {
            console.log('getUserMedia not supported on your browser!');
         }
    }
  

    updateTitleandLyricsAndReturnToHome = (evt) => {
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
                <input
                    type="file"
                    accept="audio/*"
                    capture
                    id="recorder"
                    onChange={(evt) => this.audioFileHandler(evt)} />
                <section id="audioContainer">
                    <button
                        id="recordButton"
                        onClick={(e) => this.getUserMedia(e)}
                    >REC
                    </button>
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