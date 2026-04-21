import { createContext, useContext, useReducer, useEffect } from "react";
import MovieReducer from "../reducer/MovieReducer";
import axios from "axios";
import { getToken, getDataset } from "../api/api";

const initialState = {
  movies: [],
  favorites: [],
  loading: true,
  searchTerm: "",
  searchTerm: "",
  searchTerm: "",
};

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  // Fetch movies from server
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Step 1: Get Token
        const tokenRes = await getToken(
          "E0423001", // replace during exam
          "890473", // replace during exam
          "food", // dataset set
        );

        // Step 2: Fetch dataset
        const movies = await getDataset(tokenRes.token, tokenRes.dataUrl);

        dispatch({ type: "SET_MOVIES", payload: movies });
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchMovies();
  }, []);

  // Sync favorites automatically
  useEffect(() => {
    dispatch({ type: "SET_FAVORITES" });
  }, [state.movies]);

  const addMovie = (movie) => dispatch({ type: "ADD_MOVIE", payload: movie });

  const toggleWatched = (id) =>
    dispatch({ type: "TOGGLE_WATCHED", payload: id });

  const deleteMovie = (id) => dispatch({ type: "DELETE_MOVIE", payload: id });

  const toggleFavorite = (id) =>
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        favorites: state.favorites,
        loading: state.loading,
        addMovie,
        toggleWatched,
        deleteMovie,
        toggleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
