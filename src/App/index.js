import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import getLyrics from '../helpers/data/lyricsData';
import './App.scss';

function App() {
  const [artist, setArtist] = useState({ artist: '' });
  const [song, setSong] = useState({ song: '' });
  const [lyrics, setLyrics] = useState({ lyrics: '' });
  const [newLyrics, setNewLyrics] = useState(false);

  const handleInputChange = (e) => {
    setArtist((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setSong((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (newLyrics) {
      setNewLyrics(false);
    } else {
      getLyrics(artist.artist, song.song).then((resp) => setLyrics(resp));
      setNewLyrics(true);
    }
  };

  return (
    <div className='App'>
       <Form
       type="reset">
        <FormGroup>
          <Label for="">Song Title</Label>
          <Input
          type="text"
          name="song"
          value={song.song}
          onChange={handleInputChange}
          id="user-song-input"
          placeholder="Enter song title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="">Artist</Label>
          <Input
            type="text"
            onChange={handleInputChange}
            name="artist"
            value={artist.artist}
            id="user-artist-input"
            placeholder="Enter artist name"
          />
        </FormGroup>
      </Form>
      <p>
        {newLyrics ? '' : lyrics.lyrics}
      </p>
      {newLyrics ? <Button type="submit" onClick={handleClick}>Search other lyrics</Button> : <Button type="submit" onClick={handleClick}>Get Lyrics</Button>}
    </div>
  );
}

export default App;
