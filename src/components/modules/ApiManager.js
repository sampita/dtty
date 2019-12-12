// This module handles all calls to the API. 

const remoteURL = "http://localhost:5002"

export default {
    // This fetch call gets one object from tableName.
    get(tableName, id) {
        return fetch(`${remoteURL}/${tableName}/${id}`).then(result => result.json())
    },

    // This fetch call gets all objects from tableName for the active user.
    getAll(tableName, userId) {
        return fetch(`${remoteURL}/${tableName}?userId=${userId}`).then(result => result.json())
    },

    // This fetch call posts a new object to tableName.  
    createNew(tableName, newObject) {
      return fetch(`${remoteURL}/${tableName}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newObject)
      }).then(data => data.json())
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