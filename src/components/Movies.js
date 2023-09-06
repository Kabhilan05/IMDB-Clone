import React, { useEffect, useState } from "react";

import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setNum] = useState(1);

  const [watchList, setWatchList] = useState([]);
  const [hovered, setHovered] = useState('');

  //Pagination Methods
  const onNext = () => {
    setNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setNum(pageNum - 1);
    }
  };

  //WatchList Methods
  const addToWatchList = (movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem('imdb',JSON.stringify(newWatchList))
  };
  //console.log(watchList);

  const removeWatchList = (movie) => {
    const filteredWatchList = watchList.filter((m)=>{
      return m.id != movie.id
    })
    setWatchList(filteredWatchList);
    localStorage.setItem('imdb',JSON.stringify(filteredWatchList))
    
  }
  //console.log(watchList)

  const showButton= (id)=>{
    setHovered(id)

  }

  const hideButton = ()=>{
    setHovered('')
  }

  useEffect(() => {
    (function () {
      let moviesfromLS  = localStorage.getItem('imdb')
      moviesfromLS =JSON.parse(moviesfromLS) || []
      setWatchList(moviesfromLS)
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=b3d8b9263e38c7ad643e74923c2a9be0&page=${pageNum}`
        )
        .then((res) => {
          setMovies(res.data.results);
        });
    })();
  }, [pageNum]);

  console.log(movies);

  return (
    <div>
      <div className="text-2xl mb-8 font-bold text-center">Trending Movies</div>
      <div className="flex flex-wrap">
        {movies.map((movie) => {
          return (
            <div
              onMouseOver={()=>showButton(movie.id)}
              onMouseLeave={()=>hideButton()}
              key={movie.id}
              className="w-[200px] h-[35vh] bg-center bg-cover rounded-xl m-4 md:h[40vh] md:w[200vh] hover:scale-110 duration-300  relative flex items-end"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
              }}
            >
              <div className="text-2xl p-2 bg-gray-900 rounded-2xl absolute right-2 top-2" 
                style={{display: hovered == movie.id ?'block' : 'none'}}>
                {watchList.includes(movie) == false ? (
                  <div onClick={() => addToWatchList(movie)}>💖</div>
                ) : (
                  <div onClick={()=>removeWatchList(movie)}>💔</div>
                )}
              </div>
              <div className="text-l p-2 text-white bg-gray-900 rounded-full absolute left-2 top-2 bg-opacity-60"style={{display: hovered == movie.id ?'block' : 'none'}} >{parseInt((movie.vote_average)*10)
}%</div>
              <div className="text-white text-bold text-center w-full bg-gray-900 bg-opacity-60">
                {movie.title}
              </div>
            </div>
          );
        })}
      </div>
      <Pagination pageNum={pageNum} onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

export default Movies;
