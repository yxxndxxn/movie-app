const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?language=KR`, options).then((res) =>
    res.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?language=KR&page=1&region=KR`,
    options
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?language=KR&page=1&region=KR`,
    options
  ).then((res) => res.json());

export const moviesAPI = { trending, upcoming, nowPlaying }; //object로 만들기
