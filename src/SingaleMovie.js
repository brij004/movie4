import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const SingleMovie = () => {
  //naviget hooks button working to uses
  const navigate = useNavigate()
  const back=()=>{
  navigate("/")}

  const {id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const [error, setError] = useState("");

  const getMovie = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setMovie(data);
        setIsLoading(false);
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`;
    getMovie(url);
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">loading....</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-section">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-section">
        <div className="error">Movie not found</div>
      </div>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt={movie.Title} />
        </figure>
        <div className="movie-details">
          <h2>{movie.Title}</h2>
          <p>{movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Release Date:</strong> {movie.Released}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <button type="button" className="btn btn-info"onClick={back}>Back</button>
        </div>
      </div>
      
    </section>
  );
}; 

export default SingleMovie;