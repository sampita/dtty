/* import React from 'react';
import { withRouter } from 'react-router-dom';
import { saveProfile } from './modules/ApiManager'
import * as firebase from 'firebase/app';
import 'firebase/storage'; */

/* class ProfileForm extends React.Component {
    state = {
        username: '',
        about: '',
        photo: null
    };

    submitForm = () => {
        // step 1: save Image to Firebase
        const imagesRef = firebase.storage().ref('images');
        const childRef = imagesRef.child(`${this.state.username}-${Date.now()}`);
        childRef.put(this.state.photo)
            // step 2: get url from firebase
            .then(response => response.ref.getDownloadURL())
            // step 3: save everything to json server
            .then(url => {
                return saveProfile({
                    username: this.state.username,
                    about: this.state.about,
                    photoUrl: url
                });
            })
            .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div className="image-form__container">
                <header>
                    Add a Profile
                </header>
                <form onSubmit={this.submitForm}>
                    <input
                        type="text"
                        label="Username"
                        onChange={(e) => this.setState({ username: e.target.value })}
                        placeholder="Username" />
                    <input
                        type="text"
                        label="About"
                        onChange={(e) => this.setState({ about: e.target.value })}
                        placeholder="About me" />
                    <input
                        type="file"
                        label="User Photo"
                        onChange={(e) => this.setState({ photo: e.target.files[0] })}
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default ProfileForm; */
