import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import SongCard from "./SongCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongCollection.css";
import "./Footer.css";

class Home extends Component {
    state = {
        songs: [],
        songId: null
        // selectedSong: null
    }


    /* selectSong = (song) => {
        this.setState({
            selectedSong: song.id
        })
    } */

    createNewSong = evt => {
        const activeUserId = localStorage.getItem("user")
        const firstName = localStorage.getItem("firstName")
        const lastName = localStorage.getItem("lastName")
        const dateCreated = new Date();
        // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        // this.setState({ loadingStatus: true });

        const song = {
            userId: Number(activeUserId),
            title: "Untitled",
            key: "",
            audio: "",
            length: "",
            lyrics: "",
            dateCreated: dateCreated,
            lastUpdated: dateCreated,
        };


        // Post the song to the API and redirect user to the Song View
        ApiManager.createNew("songs", song)
            .then((newSong) => {
                const newChordsObject = {
                    songId: newSong.id,
                    intro: "",
                    verse: "",
                    chorus: "",
                    bridge: "",
                    outro: ""
                };
                return ApiManager.createNew("chords", newChordsObject)
                    .then((newChordsObject) => {

                        const newWritersObject = {
                            songId: newChordsObject.songId,
                            userId: Number(activeUserId),
                            firstName: firstName,
                            lastName: lastName
                        };
                        return ApiManager.createNew("writers", newWritersObject) 
                    })
                    .then((newWritersObject) => this.props.history.push(`/songs/${newWritersObject.songId}`));
                })

    }

    getAllSongs = () => {
        const userId = localStorage.getItem("user")
        ApiManager.getAll("songs", userId)
            .then((songsArray) => {
                        this.setState({
                            songs: songsArray
                        })
                    })
    }

    deleteSong = (id) => {
        const userId = localStorage.getItem("user")
        ApiManager.delete("songs", id)
            .then(() => {
                ApiManager.deleteChain("chords", id)
                })
                .then(() => {
                    ApiManager.deleteChain("writers", id)
                    })
                    .then(() => {this.getAllSongs()
                    })
    }
    

    handleLogout = () => {
        //clears user from localStorage and redirects to home page
        this.props.clearUser();
        this.props.history.push('/login');
    }

    componentDidMount() {
        const activeUserId = localStorage.getItem("user")

        //getAll from ApiManager to get array of songs
        //then place that array in state
        this.getAllSongs()
        /* ApiManager.getAll("songs", activeUserId)
            .then((arrayOfSongs) => {
                this.setState({
                    songs: arrayOfSongs
                })
            }) */
    }


    render() {
        return (
            <>
                <header id="songCollectionHeader">
                    <h1>MY SONGS</h1>
                    <button id=
                        "logOutButton" onClick={() => this.handleLogout()}>Logout</button>
                </header>
                <div className="column">
                    <div className="ui vertical fluid menu">
                        <section className="item" id="songCardContainer">
                            {this.state.songs.map(song =>
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    id={song.id}
                                    {...this.props}
                                    deleteSong={this.deleteSong}
                                />
                                )}
                                {/* <div class="ui fitted divider"></div> */}
                        </section>
                    </div>
                </div>
                <footer id="collectionFooter">
                    <FontAwesomeIcon id="addNewSongButton" icon="plus-circle"  type="button" onClick={(evt) => this.createNewSong(evt)} />
                </footer>
            </>
        )
    }
}

export default Home;