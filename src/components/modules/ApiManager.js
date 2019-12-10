// This module handles all calls to the API. 

const remoteURL = "http://localhost:5002"

export default {
    // This fetch call gets one object from tableName.
    get(tableName, id) {
        return fetch(`${remoteURL}/${tableName}/${id}`).then(result => result.json())
    },
    // This fetch call gets all objects from tableName.
    getAll(tableName) {
        return fetch(`${remoteURL}/${tableName}`).then(result => result.json())
    },
    createNewUser(user) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(results => results.json())
    },
    checkUser(email, password) {
        return fetch(`${remoteURL}/users?email=${email}&password=${password}`)
            .then(response => response.json())
    }
}
    
    /* const url = 'http://localhost:8088/profiles';
    
    export const getProfiles = () => {
      return fetch(url).then(res => res.json());
    }
    
    export const saveProfile = (profile) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });
    } */