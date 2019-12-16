// This module handles all calls to the API. 

const remoteURL = "http://localhost:5002"

export default {
    // GET one object from tableName.
    get(tableName, id) {
        return fetch(`${remoteURL}/${tableName}/${id}`).then(result => result.json())
    },

    // GET one song from song table with chords and writers.
    getSong(tableName, objectId) {
      return fetch(`${remoteURL}/songs/${objectId}?_embed=chords&_embed=writers`).then(result => result.json())
    },

    // GET all objects from tableName for the active user.
    getAll(tableName, userId) {
        return fetch(`${remoteURL}/${tableName}?userId=${userId}`).then(result => result.json())
    },

    // GET all writers for a particular song.
    getWriters(songId) {
      return fetch(`${remoteURL}/writers?songId=${songId}`).then(result => result.json())
  },

    // PATCH information to existing object.
    patch(tableName, objectId, updatedObject) {
      return fetch(`${remoteURL}/${tableName}/${objectId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedObject)
      }).then(results => results.json())
    },

    // PATCH information to existing object.
    patchChords(songId, updatedObject) {
      return fetch(`${remoteURL}/chords/?songId=${songId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedObject)
        }).then(results => results.json())
      },
    
    // DELETE an object from tableName.
    delete(tableName, id) {
      return fetch(`http://localhost:5002/${tableName}/${id}`, {
          method: "DELETE"
      })
      .then(result => result.json())
    },

    // POST a new object to tableName.  
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