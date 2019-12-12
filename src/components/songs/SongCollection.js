import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import SongCard from "./SongCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SongCollection.css";
import "./Footer.css";

class Home extends Component {
    state = {
        songs: [],
        selectedSong: null
    }


    selectSong = (song) => {
        this.setState({
            selectedSong: song.id
        })
    }

    createNewSong = evt => {
        const activeUserId = localStorage.getItem("user")
        const dateCreated = new Date();
        // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        evt.preventDefault();

        // this.setState({ loadingStatus: true });

        const song = {
            userId: Number(activeUserId),
            title: "Untitled",
            key: null,
            audio: null,
            length: null,
            lyrics: null,
            dateCreated: dateCreated,
            lastUpdated: dateCreated,
        };

        console.log(song)

        // Post the song to the API and redirect user to the Song View
        ApiManager.createNew("songs", song)
            .then((song) => this.props.history.push(`/songs/${song.id}`));

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
                            {...this.props}
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