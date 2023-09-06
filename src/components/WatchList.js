import React, { useEffect, useState } from "react";

function WatchList() {
  const [favourites, setfavourites] = useState([]);
  const [geners, setGeners] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [rating, setRating] = useState(0);
  const [popl, setpopl] = useState(0);
  const [searchstr, setsearchstr] = useState("");

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  // let movies = [
  //   {
  //     adult: false,
  //     backdrop_path: "/ogFIG0fNXEYRQKrpnoRJcXQNX9n.jpg",
  //     id: 619930,
  //     title: "Narvik",
  //     original_language: "no",
  //     original_title: "Kampen om Narvik",
  //     overview:
  //       "April, 1940. The eyes of the world are on Narvik, a small town in northern Norway, a source of the iron ore needed for Hitler's war machine. Through two months of fierce winter warfare, the German leader is dealt with his first defeat.",
  //     poster_path: "/gU4mmINWUF294Wzi8mqRvi6peMe.jpg",
  //     media_type: "movie",
  //     genre_ids: [10752, 18, 36, 28],
  //     popularity: 321.063,
  //     release_date: "2022-12-25",
  //     video: true,
  //     vote_average: 7.406,
  //     vote_count: 53,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: "/6RCf9jzKxyjblYV4CseayK6bcJo.jpg",
  //     id: 804095,
  //     title: "The Fabelmans",
  //     original_language: "en",
  //     original_title: "The Fabelmans",
  //     overview:
  //       "Growing up in post-World War II era Arizona, young Sammy Fabelman aspires to become a filmmaker as he reaches adolescence, but soon discovers a shattering family secret and explores how the power of films can help him see the truth.",
  //     poster_path: "/d2IywyOPS78vEnJvwVqkVRTiNC1.jpg",
  //     media_type: "movie",
  //     genre_ids: [18],
  //     popularity: 163.3,
  //     release_date: "2022-11-11",
  //     video: false,
  //     vote_average: 8.02,
  //     vote_count: 561,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: "/fTLMsF3IVLMcpNqIqJRweGvVwtX.jpg",
  //     id: 1035806,
  //     title: "Detective Knight: Independence",
  //     original_language: "en",
  //     original_title: "Detective Knight: Independence",
  //     overview:
  //       "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
  //     poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
  //     media_type: "movie",
  //     genre_ids: [28, 53, 80],
  //     popularity: 119.407,
  //     release_date: "2023-01-20",
  //     video: false,
  //     vote_average: 6.6,
  //     vote_count: 10,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: "/e782pDRAlu4BG0ahd777n8zfPzZ.jpg",
  //     id: 555604,
  //     title: "Guillermo del Toro's Pinocchio",
  //     original_language: "en",
  //     original_title: "Guillermo del Toro's Pinocchio",
  //     overview:
  //       "During the rise of fascism in Mussolini's Italy, a wooden boy brought magically to life struggles to live up to his father's expectations.",
  //     poster_path: "/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg",
  //     media_type: "movie",
  //     genre_ids: [16, 14, 18],
  //     popularity: 754.642,
  //     release_date: "2022-11-18",
  //     video: false,
  //     vote_average: 8.354,
  //     vote_count: 1694,
  //   },
  // ];

  useEffect(() => {
    let moviesfromlocalStorage = localStorage.getItem("imdb");
    moviesfromlocalStorage = JSON.parse(moviesfromlocalStorage);
    setfavourites(moviesfromlocalStorage);
  }, []);

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGeners(["All Genres", ...temp]);
  });

  let filteredArray = [];

  //genre filter

  filteredArray =
    currGenre == "All Genres"
      ? favourites
      : favourites.filter((movie) => genreids[movie.genre_ids[0]] == currGenre);
  if (rating == -1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
  }
  if (rating == 1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
  }
  if (popl == -1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
  }
  if (popl == 1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
  }

  const del = (movie) => {
    let newArray = favourites.filter((m) => m.id != movie.id);
    setfavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  // Search the movie


  filteredArray = filteredArray.filter((movie)=>{
    return movie.title.toLowerCase().includes(searchstr.toLowerCase())
  })


  return (
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        {geners.map((genre) => {
          return (
            <button
              className={
                currGenre == genre
                  ? "m-2 text-lg px-2 bg-blue-400 text-white rounded-xl font-bold"
                  : "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold "
              }
              onClick={() => {
                setCurrGenre(genre);
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <div className="text-center">
        <input
          type="text"
          className="border bg-gray-200 border-4 text-center p-1 m-2"
          placeholder="Search Movies"
          value={searchstr}
          onChange={(e)=>setsearchstr(e.target.value)}

        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th>
              <div className="flex">
                <img
                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                  className="mr-1"
                  onClick={() => {
                    setRating(1);
                  }}
                />
                <div>Rating</div>
                <img
                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                  className="ml-1"
                  onClick={() => {
                    setRating(-1);
                  }}
                />
              </div>
            </th>
            <th>
              <div className="flex">
                <img
                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                  className="mr-1"
                  onClick={() => {
                    setpopl(1);
                  }}
                />
                <div>Popularity</div>
                <img
                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                  className="ml-1"
                  onClick={() => {
                    setpopl(-1);
                  }}
                />
              </div>
            </th>
            <th>
              <div className="flex">
                <div>Gener</div>
              </div>
            </th>
            <th>
              <div className="flex px-6 py-4 font-medium text-gray-900">
                <div>OverView</div>
              </div>
            </th>
          </thead>

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredArray.map((movie) => {
              return (
                <tr className="hover:bg-gray-100">
                  <td className="flex items-center px-6 py-4 fornt-normal text-gray-900 space-x-2">
                    <img
                      className="h-[6rem] w-[10rem] object-fit"
                      src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`}
                    />

                    <div className="dont-medium text-gray-700 text-sm">
                      {movie.title}
                    </div>
                  </td>
                  <td className=" pl-6 py-4">{movie.vote_average}</td>
                  <td className=" pl-6 py-4">{movie.popularity}</td>
                  <td className=" pl-6 py-4">{genreids[movie.genre_ids[0]]}</td>
                  <td className="pl-12 py-12 max-w-prose max-h-3">
                    <div class="scroll-smooth hover:scroll-auto">
                      {movie.overview}.
                    </div>
                  </td>
                  <td>
                    <button className="text-red-600" onClick={() => del(movie)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
