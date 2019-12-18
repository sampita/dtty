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
        audioURL: null,
        mediarecorder: null,
        chunks: [],
        recordingStatus: false,
        audioFromStream: null,
        newAudioFilepath: null
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
                    audioURL: song.audio,
                    songId: song.id,
                    userId: userId
                })
            })
    }

    audioUploadHandler = (evt) => {
        const file = this.state.audioURL;
        const songId = this.props.match.params.songId
        const audioRef = firebase.storage().ref('audio');
        const childRef = audioRef.child(`${Date.now()}-song-${this.state.songId}-user-${this.state.userId}`);

        // step 1: save audio to Firebase
        childRef.put(file)
            // step 2: get url from firebase
            .then(response => response.ref.getDownloadURL())
            // step 3: save everything to json server
            .then(downloadURL => {
                const newAudioURL = {
                    audio: downloadURL
                }
                ApiManager.patch("songs", songId, newAudioURL)
            })
            // step 4: update state with new audio file url
            .then(() => {this.getUpdatedSongInfo()})
    }

    
    // Collect audio data as recording progesses
    //recorder()
    getAudioStream = () => {
        const audioStream = new MediaRecorder(this.state.audioFromStream);
        console.log(audioStream.state);
        console.log("this.state.audioFromStream", this.state.audioFromStream)
        console.log("recorder started");
        audioStream.ondataavailable = (e) => {
            let chunksFromAudioStream = []
            chunksFromAudioStream.push(e.data)
            this.setState({
                chunks: chunksFromAudioStream
            })
            /* .then(console.log("this.state.chunks ondataavailable", this.state.chunks)) */
        }
        audioStream.onstop = (e) => {
            let audioBlob = new Blob(this.state.chunks, { 'type': 'audio/ogg; codecs=opus' })
            let audioURL = window.URL.createObjectURL(audioBlob);
            this.setState({
                chunks: [],
                audioURL: audioURL,
                audioBlob: audioBlob
            })
        }
        this.setState({ mediarecorder: audioStream })

        
    }
    
// **************************************************************
//                   MICROPHONE ON/OFF FUNCTIONS
// **************************************************************

    // If there is audio currently being captured, turn microphone off. If there is no audio being captured, turn microphone on.
    toggleMicrophone = () => {
        if (this.state.audioFromStream) {
          this.stopMicrophone()
        } else {
          this.turnOnMicrophone()
        }
      }

    // getMicrophone()
    turnOnMicrophone = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia (
                // Constraints - only audio needed for this app
                {
                    audio: true
                })
               .then((audioFromStream) => {
                   this.setState({ audioFromStream })
                   this.getAudioStream()
               })
               
               // Error callback
               .catch(function(err) {
                  console.log('The following getUserMedia error occured: ' + err);
                  this.setState({ audioFromStream: null });
               }
            );
         } else {
            console.log('getUserMedia not supported on your browser!');
         }
    }

    stopMicrophone = () => {
        this.state.audio.getTracks().forEach(track => track.stop())
        this.setState({ audioFromStream: null })
      }

// **************************************************************
//                   RECORDING FUNCTIONS
// **************************************************************

    startOrStopRecording = () => {
        if (this.state.recordingStatus) {
            //Stop recording
            this.state.mediarecorder.stop()
            this.setState({ recordingStatus: false })
            this.audioUploadHandler()
        } else {
            //Start recording
            this.state.mediarecorder.start()
            this.setState({ recordingStatus: true})
        }
    }

    stopRecording = () => {
        this.stopMicrophone()
        this.setState({ recordingStatus: false })
    }

    updateTitleandLyricsAndReturnToHome = (evt) => {
        // this.toggleMicrophone()

        const songId = this.props.match.params.songId

        const updatedTitleAndLyrics = {
            title: this.state.title,
            lyrics: this.state.lyrics
        };

        ApiManager.patch("songs", songId, updatedTitleAndLyrics)
            .then(() => this.props.history.push("/"))

    }

    toggleDetailsCard = () => {
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
        
        // this.turnOnMicrophone()

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
                    onChange={(evt) => this.audioUploadHandler(evt)} />
                <section id="audioContainer">
                    <button
                        id="recordButton"
                        onClick={() => this.startOrStopRecording()}
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
                        <SongDetailsEdit toggle={this.toggleDetailsCard} {...this.props} />
                    ) : <SongDetails toggle={this.toggle} {...this.props} title={this.state.title} lyrics={this.state.lyrics} updateSongAndReturnToHome={this.updateTitleandLyricsAndReturnToHome} />}
                </footer>
            </>
        );
    }
}

export default SongView;