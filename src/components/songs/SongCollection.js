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
        evt.preventDefault();
        const activeUserId = localStorage.getItem("user")
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
                    const chords = {
                        songId:newSong.id,
                        intro: "",
                        verse: "",
                        chorus: "",
                        bridge: "",
                        outro: ""
                    };
            
                    ApiManager.createNew("chords", chords)
                    .then(() => {
                        ApiManager.get("users", Number(activeUserId))
                        .then((userInfo) => {
                            console.log("userInfo", userInfo)
                                const writer = {
                                    songId: newSong.id,
                                    userId: Number(activeUserId),
                                    firstName: userInfo.firstName,
                                    lastName: userInfo.lastName
                                };
                                ApiManager.createNew("writers", writer)
                                .then(() => this.props.history.push(`/songs/${newSong.id}`));
                                
                        })
                    })
            })

    }

    delete = (id) => {
    const userId = localStorage.getItem("user")
        ApiManager.delete("songs", id)
        .then(() => {
            ApiManager.getAll("songs", userId)
            .then((songs) => {
                this.setState({
                    songs: songs
                })
            })
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
        ApiManager.getAll("songs", activeUserId)
            .then((arrayOfSongs) => {
                this.setState({
                    songs: arrayOfSongs
                })
            })
    }


    render() {
        return (
            <>
                <header>
                    <h1>MY SONGS</h1>
                </header>
                <section id="songCardContainer">
                    {this.state.songs.map(song =>
                        <SongCard
                            key={song.id}
                            song={song}
                            id={song.id}
                            {...this.props}
                            delete={this.delete}
                        />
                    )}
                </section>
                <footer id="collectionFooter">
                    <FontAwesomeIcon icon="plus-circle" size="3x" type="button" onClick={(evt) => this.createNewSong(evt)} />
                    <button id=
                    "logOutButton" onClick={() => this.handleLogout()}>Logout</button>
                </footer>
            </>
        )
    }
}

export default Home;