import React, { useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();
//we need provider function
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Movie, setmovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQury] = useState();

  const getMovie = async (url) => {
    setIsLoading(true)
    try {
      if (query) {
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === "True") {
            console.log(data)
            setIsLoading(false);
          setmovie(data.Search);
        } else {
          setIsError({
            show: "true",
            msg: data.Error,
          });
        }
      } else {
        setQury("");
        const res = await fetch(
          `https://www.omdbapi.com/?type=movie&apikey=${process.env.REACT_APP_API_KEY}&s=hacker`
        );
        const data = await res.json();
        if (data.Response === "True") {
            setIsLoading    (false);
          setmovie(data.Search);

          setIsError({
            show: "false",
            msg:data.Error,
          });
        } else {
          setIsError({
            show: "true",
            msg: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovie(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timerOut);
  }, [query]);
  return (
    <AppContext.Provider value={{ isLoading, isError, Movie, query, setQury }}>
      {children}
    </AppContext.Provider>
  );
};
//globale custome hooks
const GlobaleContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, GlobaleContext };
