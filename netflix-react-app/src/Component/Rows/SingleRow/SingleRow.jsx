import React, { useEffect, useState } from "react";
import axios from "../../../Utils/axios";
import "./singlerow.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const SingleRow = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          if (!url) return; // handle not found
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log("Trailer not found:", movie?.title));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row_posters">
        {movies?.map((movie) => {
          const imagePath = isLargeRow
            ? movie?.poster_path
            : movie?.backdrop_path;
          if (!imagePath) return null; // skip movies without images

          return (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              src={`${base_url}${imagePath}`}
              alt={movie?.title || movie?.name}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            />
          );
        })}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default SingleRow;
