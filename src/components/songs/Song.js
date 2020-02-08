import React, { Component } from 'react'
import ApiManager from '../modules/ApiManager'
import SongDetails from './SongDetails'
import SongDetailsEdit from './SongDetailsEdit'
import TextareaAutosize from 'react-autosize-textarea'
import { Label, Popup, Input, Icon, Modal, Button, Image, Header } from 'semantic-ui-react'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import './Song.css'
import './Footer.css'

class SongView extends Component {
  // Sets initial state
  state = {
    userId: '',
    editSongDetails: false,
    title: '',
    tag: '',
    lyrics: '',
    audioURL: null,
    mediarecorder: null,
    chunks: [],
    recordingStatus: false,
    audioFromStream: null,
    newAudioFilepath: null,
    audioBlob: null,
    tags: [],
    isOpen: false,
    open: false,
    writers: [],
    writerFirstName: '',
    writerLastName: '',
  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false })

  handleFieldChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  updateTitleandLyricsAndReturnToHome = evt => {
    const songId = this.props.match.params.songId
    const lastUpdated = new Date()

    const updatedTitleAndLyrics = {
      title: this.state.title,
      lyrics: this.state.lyrics,
      lastUpdated: lastUpdated,
    }

    ApiManager.patch('songs', songId, updatedTitleAndLyrics).then(() =>
      this.props.history.push('/')
    )
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  submitNewTag = evt => {
    evt.preventDefault()

    const songId = this.props.match.params.songId

    const str = this.state.tag
    const tagText = str.toUpperCase()

    const newTag = {
      tag: tagText,
      songId: songId,
    }

    ApiManager.createNew('tags', newTag)
      .then(() => {
        this.setState({
          tag: '',
          isOpen: false,
        })
      })
      .then(this.getUpdatedSongInfo())
  }

  toggleDetailsCard = () => {
    let editToggle = this.state.editSongDetails
    editToggle = editToggle ? false : true
    this.setState({
      editSongDetails: editToggle,
    })
  }

  getUpdatedSongInfo() {
    const songId = this.props.match.params.songId
    const userId = localStorage.getItem('user')
    ApiManager.get('songs', songId)
      .then(song => {
        this.setState({
          title: song.title,
          lyrics: song.lyrics,
          audioURL: song.audio,
          songId: song.id,
          userId: userId,
        })
      })
      .then(() => {
        ApiManager.getItemsForSpecificSong('tags', songId).then(tagsArray =>
          this.setState({ tags: tagsArray })
        )
      })
  }

  deleteTag = id => {
    ApiManager.delete('tags', id).then(() => {
      this.getUpdatedSongInfo()
    })
  }

  // **************************************************************
  //                   MICROPHONE FUNCTIONS
  // **************************************************************

  turnOnMicrophone = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.')

      navigator.mediaDevices
        .getUserMedia(
          // Constraints - only audio needed for this app
          {
            audio: true,
            video: false,
          }
        )
        .then(audioFromStream => {
          this.setState({ audioFromStream })
          this.getAudioStream()
        })

        // Error callback
        .catch(function(err) {
          console.log('The following turnOnMicrophone error occured: ' + err)
          this.setState({ audioFromStream: null })
        })
    } else {
      console.log('Microphone access not supported on your browser!')
    }
  }

  // Collect audio data
  getAudioStream = () => {
    // debugger
    const audioStream = new MediaRecorder(this.state.audioFromStream)
    console.log('audioStream.state', audioStream.state)
    console.log('this.state.audioFromStream', this.state.audioFromStream)
    console.log('audioStream', audioStream)

    audioStream.ondataavailable = e => {
      this.setState({
        recordingStatus: true,
        chunks: [...this.state.chunks, e.data],
      })
      console.log('audioStream.state ondataavailable', audioStream.state)
      console.log('this.state.chunks ondataavailable', this.state.chunks)
    }
    audioStream.onstop = e => {
      let audioBlob = new Blob(this.state.chunks, { type: 'audio/mp3' })
      let audioURL = window.URL.createObjectURL(audioBlob)
      console.log('audioURL', audioURL)

      this.setState({
        chunks: [],
        audioURL: audioURL,
        audioBlob: audioBlob,
        recordingStatus: false,
      })
      console.log('audioBlob onstop', this.state.audioBlob)
      console.log('audioURL onstop', this.state.audioURL)

      //upload audio to firebase
      this.audioUploadHandler()
    }
    this.setState({ mediarecorder: audioStream })
  }

  // **************************************************************
  //                   RECORDING FUNCTIONS
  // **************************************************************

  recordingOnOffSwitch = () => {
    if (this.state.recordingStatus) {
      this.stopRecording()
    } else {
      this.startRecording()
    }
  }

  stopRecording = () => {
    this.state.mediarecorder.stop()
    console.log('mediarecorder stopRecording', this.state.mediarecorder)
    this.setState({ recordingStatus: false })
  }

  startRecording = () => {
    this.state.mediarecorder.start(500)
    console.log('mediarecorder startRecording', this.state.mediarecorder)
    this.setState({ recordingStatus: true })
  }

  // **************************************************************
  //                   AUDIO UPLOAD
  // **************************************************************

  audioUploadHandler = () => {
    const blob = this.state.audioBlob
    const songId = this.props.match.params.songId
    const audioRef = firebase.storage().ref('audio')
    const childRef = audioRef.child(
      `${Date.now()}-song-${this.state.songId}-user-${this.state.userId}`
    )

    console.log('audioUploadHandler blob', blob)
    // step 1: save audio blob to Firebase
    childRef
      .put(blob)
      // step 2: get url from firebase
      .then(response => response.ref.getDownloadURL())
      // step 3: save everything to json server
      .then(downloadURL => {
        console.log('downloadURL upload', downloadURL)
        this.setState({
          audioURL: downloadURL,
        })
      })
      .then(() => {
        const newAudioURL = {
          audio: this.state.audioURL,
        }
        ApiManager.patch('songs', songId, newAudioURL)
      })
  }

  saveNewWriter = evt => {
    const songId = Number(this.props.match.params.songId)
    const newWriterObject = {
      songId: songId,
      userId: '',
      firstName: this.state.writerFirstName,
      lastName: this.state.writerLastName,
    }

    ApiManager.createNew('writers', newWriterObject).then(() => {
      ApiManager.getItemsForSpecificSong('writers', songId).then(writersArray =>
        this.setState({
          writers: writersArray,
          firstName: '',
          lastName: '',
        })
      )
    })

    this.close()
  }

  componentDidMount() {
    this.getUpdatedSongInfo()
    this.turnOnMicrophone()
    const songId = this.props.match.params.songId
    ApiManager.getItemsForSpecificSong('tags', songId).then(tagsArray =>
      this.setState({ tags: tagsArray })
    )
  }

  render() {
    const { open, dimmer } = this.state

    return (
      <>
        <div>
          <Modal id="writerModal" dimmer={dimmer} open={open} onClose={this.close}>
            <Modal.Header>Add Writer</Modal.Header>
            <Modal.Content scrolling>
              <form>
                <div>
                  <label className="writerLabel">First Name</label>
                  <Input name="writerFirstName" onChange={evt => this.handleFieldChange(evt)} />
                </div>
                <div>
                  <label className="writerLabel">Last Name</label>
                  <Input name="writerLastName" onChange={evt => this.handleFieldChange(evt)} />
                </div>
              </form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={this.close}>
                Cancel
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Submit"
                onClick={evt => this.saveNewWriter(evt)}
              />
            </Modal.Actions>
          </Modal>
        </div>
        <div>
          <input
            name="title"
            id="songTitle"
            onChange={evt => this.handleFieldChange(evt)}
            value={this.state.title}
          ></input>
        </div>
        <section id="audioContainer">
          <Icon
            name="microphone"
            id="recordButton"
            className={`${this.state.recordingStatus !== false ? 'glowing' : null}`}
            onClick={() => this.recordingOnOffSwitch()}
          />
          <audio id="player" controls src={this.state.audioURL}></audio>
        </section>
        <section id="tagContainerSongView">
          {this.state.tags.map(tag => (
            <Label key={tag.id} color="purple" horizontal>
              {tag.tag}
              <Icon
                name="delete"
                onClick={() => {
                  this.deleteTag(tag.id)
                }}
              />
            </Label>
          ))}
          <Popup
            trigger={
              <button className="ui horizontal label" id="addTagButton">
                ADD TAG +
              </button>
            }
            content={
              <form onSubmit={this.submitNewTag}>
                <Input
                  icon="tags"
                  iconPosition="left"
                  name="tag"
                  onChange={evt => this.handleFieldChange(evt)}
                  placeholder="Enter new tag..."
                />
              </form>
            }
            open={this.state.isOpen}
            on="click"
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            position="bottom right"
          />
        </section>
        <div className="lyricsTextArea paper">
          <div className="lines">
            <TextareaAutosize
              type="text"
              name="lyrics"
              className="lyricsTextBox text"
              placeholder="Write your lyrics here..."
              onChange={evt => this.handleFieldChange(evt)}
              onResize={e => {}}
              value={this.state.lyrics}
            ></TextareaAutosize>
          </div>
        </div>
        <footer id="songFooter">
          {this.state.editSongDetails ? (
            <SongDetailsEdit
              toggle={this.toggleDetailsCard}
              show={this.show(dimmer)}
              {...this.props}
              writers={this.state.writers}
            />
          ) : (
            <SongDetails
              toggle={this.toggleDetailsCard}
              {...this.props}
              title={this.state.title}
              lyrics={this.state.lyrics}
              updateSongAndReturnToHome={this.updateTitleandLyricsAndReturnToHome}
            />
          )}
        </footer>
      </>
    )
  }
}

export default SongView
