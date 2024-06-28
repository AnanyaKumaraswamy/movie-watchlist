import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Header from'./components/Header';
import MovieScreen from './components/MovieScreen'
import Watchlist from './components/Watchlist';
import { useEffect, useState } from 'react';

function App() {

  const [ movieList, setMovieList ]=  useState([]);
  const [ list, setList ]=  useState([]);
  const [ page, setPage]=  useState(1);
  

  const getData = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    .then((res) => {
      console.log(res.data.results);
      setMovieList(res.data.results);
    })
  };


  const addMovie = (movie) => setList([...list, movie]);

  const removeMovie = (movie) => {
    const newState = list.filter((mov) => {
      return mov !== movie;
    });
    setList(newState);
  };

  
  useEffect(() => {
    getData();
  }, [page]);


  return (
    <div className="App">
       <Header/>
       <main>
          <MovieScreen 
            movieList={movieList}
            page={page}
            setPage={setPage}
            list={list}
            addMovie={addMovie}
            removeMovie={removeMovie}
          />
          <Watchlist list={list} removeMovie={removeMovie}/>
       </main>
       
    </div>
  )
}

export default App;
