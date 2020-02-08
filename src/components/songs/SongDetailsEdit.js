import React, { Component } from 'react'
import ApiManager from '../modules/ApiManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Label, Popup, Input, Icon, Modal, Button, Image, Header } from 'semantic-ui-react'
import './SongDetails.css'

class SongDetailsEdit extends Component {
  //set the initial state
  state = {
    key: '',
    verse: '',
    chorus: '',
    bridge: '',
    writers: [],
    writersId: '',
    chordsId: '',
    hidden: true,
    firstName: '',
    lastName: '',
  }

  saveChangesAndToggleView = evt => {
    const songId = this.props.match.params.songId
    const chordsId = this.state.chordsId

    const updatedKey = {
      key: this.state.key,
    }
    const updatedChords = {
      verse: this.state.verse,
      chorus: this.state.chorus,
      bridge: this.state.bridge,
    }

    ApiManager.patch('songs', songId, updatedKey)
      .then(() => ApiManager.patch('chords', chordsId, updatedChords))
      .then(this.props.toggle)
  }

  /* saveNewWriter = evt => {
        const songId = Number(this.props.match.params.songId)
        const newWriterObject = {
            songId: songId,
            userId: "",
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        ApiManager.createNew("writers", newWriterObject)
            .then(() => {
                ApiManager.getItemsForSpecificSong("writers", songId).then(writersArray => 
                    this.setState({
                        writers: writersArray,
                        firstName: "",
                        lastName: ""
                    }));
            })

        this.collapsibleFormHandler(evt)
    } */

  handleFieldChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  /*     collapsibleFormHandler = (evt) => {
        let hiddenForm = this.state.hidden
        hiddenForm = hiddenForm ? false : true;
        this.setState({
            hidden: hiddenForm
        })
    } */

  componentDidMount() {
    const songId = this.props.match.params.songId
    ApiManager.getSong(songId).then(song => {
      this.setState({
        key: song.key,
        verse: song.chords[0].verse,
        chorus: song.chords[0].chorus,
        bridge: song.chords[0].bridge,
        writersId: song.writers[0].id,
        chordsId: song.chords[0].id,
      })
    })
    ApiManager.getItemsForSpecificSong('writers', songId).then(writersArray =>
      this.setState({ writers: writersArray })
    )
  }

  render() {
    console.log('writers array', this.state.writers)
    return (
      <>
        <div id="songDetailsBigContainer">
          <p className="songDetailsContainer boldText">
            Key:
            <input
              type="text"
              className="songEditInput"
              name="key"
              value={this.state.key}
              onChange={evt => this.handleFieldChange(evt)}
            ></input>
            <FontAwesomeIcon icon="edit" type="button" />
          </p>
          <p className="songDetailsContainer boldText">
            Verse:
            <input
              type="text"
              className="songEditInput"
              name="verse"
              value={this.state.verse}
              onChange={evt => this.handleFieldChange(evt)}
            ></input>
            <FontAwesomeIcon icon="edit" type="button" />
          </p>
          <p className="songDetailsContainer boldText">
            Chorus:
            <input
              type="text"
              className="songEditInput"
              name="chorus"
              value={this.state.chorus}
              onChange={evt => this.handleFieldChange(evt)}
            ></input>
            <FontAwesomeIcon icon="edit" type="button" />
          </p>
          <p className="songDetailsContainer boldText">
            Bridge:
            <input
              type="text"
              className="songEditInput"
              name="bridge"
              value={this.state.bridge}
              onChange={evt => this.handleFieldChange(evt)}
            ></input>
            <FontAwesomeIcon icon="edit" type="button" />
          </p>
          <span className="songDetailsContainer boldText">Written By:</span>
          {this.props.writers.map(writer => (
            <div key={writer.id} value={writer.id}>
              {writer.firstName} {writer.lastName}
            </div>
          ))}
          <Button id="addWriterButton" onClick={() => this.props.show('blurring')}>
            Add Writer +
          </Button>
          {/* <div className="content" hidden={this.state.hidden}>
                            <div>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={(evt) => this.handleFieldChange(evt)}
                                    >
                                </input>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={(evt) => this.handleFieldChange(evt)}
                                    >
                                </input>
                            </div>
                            <button id="saveNewWriterButton" onClick={(evt) => {this.saveNewWriter(evt)}}>Add</button>
                        </div> */}
        </div>
        <section className="flexContainer">
          <button
            id="editSongDetailsButton"
            onClick={() => {
              this.saveChangesAndToggleView()
            }}
          >
            Save
          </button>
        </section>
      </>
    )
  }
}

export default SongDetailsEdit
