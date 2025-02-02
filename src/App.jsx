import { useEffect, useState } from 'react';
import './App.css';
import { MovieCard } from "./components/MovieCard";

const API_URL = `https://www.omdbapi.com/?apikey=2e3b2601`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState(() => {
    // Get the watchlist from localStorage or initialize it as an empty array
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = [...prevWatchlist, movie];
      // Save to localStorage
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter((movie) => movie.imdbID !== movieId);
      // Save to localStorage
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  const isAddedToWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.imdbID === movieId);
  };

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  return (
    <div className="app">
      <h1>Movie Look Up</h1>

      {/* Search Section */}
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={'https://cdn-icons-png.flaticon.com/512/54/54481.png'}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/* Movies Section */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => addToWatchlist(movie)}
              isAdded={isAddedToWatchlist(movie.imdbID)} // Track if the movie is in the watchlist
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found!</h2>
        </div>
      )}

      {/* Watchlist Section */}
      {watchlist.length > 0 && (
        <div className="watchlist">
          <h2>Your Watchlist</h2>
          <div className="container">
            {watchlist.map((movie) => (
              <div key={movie.imdbID} className="movie">
                <div>
                  <p>{movie.Title}</p>
                </div>
                <div>
                  <img
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : 'https://via.placeholder.com/400'
                    }
                    alt={movie.Title}
                  />
                </div>
                <div>
                  <span>{movie.Type}</span>
                  <h3>{movie.Title}</h3>
                  <button onClick={() => removeFromWatchlist(movie.imdbID)}>
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
