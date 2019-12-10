import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import SongCard from "./SongCard";

class Home extends Component {
    state = {
        songs:[]
    }

    componentDidMount() {
        //getAll from ApiManager to get array of songs
        //then place that array in state
        ApiManager.getAll("songs")
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
            </>
        )
    }
}

export default Home;