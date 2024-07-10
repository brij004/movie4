import React from "react";
import { GlobaleContext } from "./context";
import { NavLink } from "react-router-dom";

const Movie = () => {
  const { Movie,isLoading } = GlobaleContext();
  
  if (isLoading) {
    return (
      <section  >
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <>
      <section className="movie-page">
        <div className="container grid grid-4-col">
          {Movie.map((curMovie) => {
            const { imdbID, Title, Poster } = curMovie;

            return (
              <NavLink to={`/movie/${imdbID}`} key={imdbID}>
                <div className="card">
                  <div className="card-info">
                    <h2 className="si">{Title}</h2>
                    <img src={Poster} alt={imdbID} />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Movie;
