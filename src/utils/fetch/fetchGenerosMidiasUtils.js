import { api } from "../../services/api";

const fetchListaGenerosMidiasUtils = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=pt-BR', api);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchListaGenerosMidiasUtils