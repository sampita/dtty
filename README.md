# dtty :microphone:

## A songwriting app you can use whenever, wherever

![App Screenshots](./src/images/dtty-preview.png)

**dtty** is a dynamic, mobile-friendly web application built
using React. It is a songwriting app where users can
capture audio and text as well as add keys, chords, writer
names, and tags to each song. The idea was born from a
problem I identified when I was still working as an audio engineer. I
realized that when someone had a song idea, there was
no widely-used mobile application that would allow that person to
store lyrics (text) and melodies (audio) in a single, organized place.
**dtty** was created to solve this problem.

---

## Technologies Used

- React
- MediaStream Recording API
- Firebase Cloud Storage
- JSON Server
- MomentJS
- Semantic UI

---

## How It Works

**dtty** allows each user to create an account and login to show their unique song collection. From here, they can create a new song or view/edit an existing song from their collection.

![App Screenshots](./src/images/dtty-login-homepage.gif)

Also from the song collection view, a user can search for a word or term in the title and lyrics of each song to filter down the results.

![App Screenshots](./src/images/dtty-search.gif)

When a user creates a new song, they can not only write lyrics, but also record audio by clicking the Microphone icon.

![App Screenshots](./src/images/dtty-new-song.gif)

A user can add the song's key and chords.

![App Screenshots](./src/images/dtty-song-details.gif)

A user can add additional writers to each song.

![App Screenshots](./src/images/dtty-add-writer.gif)

---

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/sampita/dtty.git
   ```

1. Navigate to the project directory

   ```sh
   cd dtty
   ```

1. Install dependencies

   ```sh
   // If using Yarn
   yarn

   // If using NPM
   npm i
   ```

1. Start the local JSON server

   ```sh
   yarn serve
   //OR
   npm run serve
   ```

1. Run the application locally

   ```sh
   yarn start
   //OR
   npm start
   ```

1. Setup a firebase account and project at [Google's Firebase Site](https://console.cloud.google.com)
1. Set up a new Project. (_NOTE: enable google analytics or this project will not work_)
1. Create a new folder and file with the file path of `src/config/firebaseConfig.js`
1. Copy the `firebaseConfig` object and paste in in `firebaseConfig.js` and export it as a named export.
   ```js
   export const firebaseConfig = {
     apiKey: 'YourApiKeyHere',
     authDomain: 'example.firebaseapp.com',
     databaseURL: 'https://example.firebaseio.com',
     projectId: 'dtty-EXAMPLE',
     storageBucket: 'example.foo.com',
     messagingSenderId: 'example',
     appId: '1::web:example',
     measurementId: 'G-EXAMPLE',
   }
   ```

---

&copy; 2020 | Application written by Sam Pita
