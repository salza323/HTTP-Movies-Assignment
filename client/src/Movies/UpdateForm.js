import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: '',
};

const UpdateForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log('Get Error:', err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies${id}`, movie)
      .then((res) => {
        props.setMovies(res.data);
        push('/movies');
      })
      .catch((err) => {
        console.log('Put Error:', err);
      });
  };

  return (
    <div>
      <h2>Movie Update</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='title'
          value={movie.title}
        />
        <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='director'
          value={movie.director}
        />
        <input
          type='text'
          name='metascore'
          onChange={changeHandler}
          placeholder='metascore'
          value={movie.metascore}
        />
        <input
          type='text'
          name='stars'
          onChange={changeHandler}
          placeholder='stars'
          value={movie.stars}
        />
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default UpdateForm;
