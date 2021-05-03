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
  const [newLyrics, setNewLyrics] = useState(true);

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
    getLyrics(artist.artist, song.song).then((resp) => setLyrics(resp));
    if (newLyrics) {
      setNewLyrics(false);
    } else {
      setNewLyrics(true);
    }
    setArtist({ artist: '' });
    setSong({ song: '' });
  };

  return (
    <div className='App'>
       <Form>
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
      <div>
        {!newLyrics && lyrics.lyrics}
      </div>
      <Button type="submit" onClick={handleClick}>{newLyrics ? 'Get Lyrics' : 'Search New Lyrics'}</Button>
    </div>
  );
}

export default App;
