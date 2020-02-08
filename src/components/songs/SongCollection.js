import React, { Component } from 'react'
import ApiManager from '../modules/ApiManager'
import SongCard from './SongCard'
import { Input, Dropdown, Icon } from 'semantic-ui-react'
import './SongCollection.css'
import './Footer.css'

class Home extends Component {
  state = {
    songs: [],
    songId: null,
    searchInput: '',
  }

  handleFieldChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  createNewSong = evt => {
    const activeUserId = localStorage.getItem('user')
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const dateCreated = new Date()

    const song = {
      userId: Number(activeUserId),
      title: 'Untitled',
      key: '',
      audio: '',
      length: '',
      lyrics: '',
      dateCreated: dateCreated,
      lastUpdated: dateCreated,
    }

    // Post the song to the API and redirect user to the Song View
    ApiManager.createNew('songs', song).then(newSong => {
      const newChordsObject = {
        songId: newSong.id,
        intro: '',
        verse: '',
        chorus: '',
        bridge: '',
        outro: '',
      }
      return ApiManager.createNew('chords', newChordsObject)
        .then(newChordsObject => {
          const newWritersObject = {
            songId: newChordsObject.songId,
            userId: Number(activeUserId),
            firstName: firstName,
            lastName: lastName,
          }
          return ApiManager.createNew('writers', newWritersObject)
        })
        .then(newWritersObject => this.props.history.push(`/songs/${newWritersObject.songId}`))
    })
  }

  getAllSongs = () => {
    const userId = localStorage.getItem('user')
    ApiManager.getAllSongs('songs', userId).then(songsArray => {
      console.log('songsArray: ', songsArray)
      this.setState({
        songs: songsArray,
      })
    })
  }

  deleteSong = id => {
    const userId = localStorage.getItem('user')
    ApiManager.delete('songs', id)
      .then(() => {
        ApiManager.deleteChain('chords', id)
      })
      .then(() => {
        ApiManager.deleteChain('writers', id)
      })
      .then(() => {
        this.getAllSongs()
      })
  }

  searchSongCollection = evt => {
    this.handleFieldChange(evt)

    const userId = localStorage.getItem('user')
    ApiManager.getAll('songs', userId)
      .then(songsArray =>
        songsArray.filter(song => {
          const songTitle = song.title
          const songLyrics = song.lyrics
          const query = this.state.searchInput

          return (
            songTitle.toLowerCase().includes(query.toLowerCase()) ||
            songLyrics.toLowerCase().includes(query.toLowerCase())
          )
        })
      )
      .then(
        results => console.log('promise songs result: ', results) // || this.setState({ songs: results })
      )
  }

  handleLogout = () => {
    //clears user from localStorage and redirects to home page
    this.props.clearUser()
    this.props.history.push('/login')
  }

  componentDidMount() {
    const activeUserId = localStorage.getItem('user')

    //getAll from ApiManager to get array of songs
    //then place that array in state
    this.getAllSongs()
  }

  render() {
    console.log('this.state.searchInput', this.state.searchInput)
    return (
      <>
        <header>
          <div id="songCollectionHeader">
            <h1>MY SONGS</h1>
            <button id="logOutButton" onClick={() => this.handleLogout()}>
              Logout
            </button>
          </div>
          <div id="searchContainer">
            <Input
              type="text"
              id="searchInput"
              name="searchInput"
              icon={<Icon name="search" link />}
              placeholder="Search songs..."
              value={this.state.searchInput}
              onChange={evt => this.searchSongCollection(evt)}
            />
            <Dropdown
              id="filterButton"
              text="Filter"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="tags" content="Filter by tag" />
                <Dropdown.Divider />
                <Dropdown.Item
                  label={{ color: 'red', empty: true, circular: true }}
                  text="Important"
                />
                <Dropdown.Item
                  label={{ color: 'blue', empty: true, circular: true }}
                  text="Announcement"
                />
                <Dropdown.Item
                  label={{ color: 'black', empty: true, circular: true }}
                  text="Discussion"
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className="column">
          <section className="item" id="songCardContainer">
            {console.log('state: ', this.state)}
            {this.state.songs &&
              this.state.songs.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                  id={song.id}
                  {...this.props}
                  deleteSong={this.deleteSong}
                />
              ))}
          </section>
        </div>
        <footer id="collectionFooter">
          <Icon name="plus circle" id="addNewSongButton" onClick={evt => this.createNewSong(evt)} />
        </footer>
      </>
    )
  }
}

export default Home
