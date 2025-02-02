export const MovieCard = ({ movie, onClick, isAdded }) => {
  return (
    <div className="movie">
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
        <button
          className={isAdded ? 'added' : 'add-to-watchlist'}
          onClick={onClick}
        >
          {isAdded ? 'Added!' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};
