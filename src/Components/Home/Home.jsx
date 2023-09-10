import React, { useEffect, useState } from "react";
import "./Home.scss";
import { ImPlay, ImPlus } from "react-icons/im";
import axios from "axios";
import { Link } from "react-router-dom";
const apiKey = "00213ec55a87548555e5f7493609a366";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowplaying = "now_playing";
const popular = "popular";
const toprated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover " />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [nowplayingMovies, setnowplayingMovies] = useState([]);
  const [topratedMovies, settopratedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setupcomingMovies(results);
    };

    const fetchNowplaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowplaying}?api_key=${apiKey}`);
      setnowplayingMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setpopularMovies(results);
      console.log(results);
    };

    const fetchToprated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${toprated}?api_key=${apiKey}`);
      settopratedMovies(results);
    };

    const fetchGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    fetchToprated();
    fetchNowplaying();
    fetchPopular();
    fetchToprated();
    fetchUpcoming();
    fetchGenre();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "none",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div className="button">
          <button>
            <ImPlay /> Play
          </button>
          <button>
            <ImPlus /> My List
          </button>
        </div>
      </div>

      <Row title={"Upcomig Movies"} arr={upcomingMovies} />
      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"Now Playing"} arr={nowplayingMovies} />
      <Row title={"Top Rated"} arr={topratedMovies} />
      <div className="genrebox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
