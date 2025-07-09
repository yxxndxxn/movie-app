const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}
export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

//object로 만들기
//movie
export const moviesAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?language=KR`, options).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?language=KR&page=1&region=KR`,
      options
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?language=KR&page=1&region=KR`,
      options
    ).then((res) => res.json()),
};

//tv
export const tvAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?language=KR`, options).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?language=KR`, options).then((res) =>
      res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?language=KR`, options).then((res) =>
      res.json()
    ),
};
