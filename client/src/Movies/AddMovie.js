import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: '',
};

const AddMovie = () => {
  const [movie, setMovie] = useState(initialMovie);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const { push } = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = [];
    newArr.push(movie.stars);
    // console.log(newArr);
    const newMovie = {
      ...movie,
      stars: newArr,
    };
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then((res) => {
        push('/');
      })
      .catch((err) => {
        console.log('Post Error:', err);
      });
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='title'
          value={movie.title}
        />
        <br></br>
        <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='director'
          value={movie.director}
        />
        <br></br>
        <input
          type='text'
          name='metascore'
          onChange={changeHandler}
          placeholder='metascore'
          value={movie.metascore}
        />
        <br></br>
        <input
          type='text'
          name='stars'
          onChange={changeHandler}
          placeholder='stars'
          value={movie.stars}
        />
        <br></br>
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
