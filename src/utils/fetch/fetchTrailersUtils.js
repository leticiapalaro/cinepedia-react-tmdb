import { api } from "../../services/api";

const fetchTrailersUtils = async (id, media_type) => {
  try {

    let trailerInfo =[];

    // URLs base para buscar trailers de filmes e séries
    const baseUrlFilme = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;
    const baseUrlSerie = `https://api.themoviedb.org/3/tv/${id}/videos?language=pt-BR`;

    if (media_type == 'tv'){
      const response = await fetch(baseUrlSerie, api);
      const data = await response.json();

      const trailers = data.results;
      trailerInfo = trailers.map(trailer => ({
        linkYT: `https://www.youtube.com/watch?v=${trailer.key}`,
        titulo: trailer.name
      }));
    }else{
      const response = await fetch(baseUrlFilme, api);
      const data = await response.json();

      const trailers = data.results;
      trailerInfo = trailers.map(trailer => ({
        linkYT: `https://www.youtube.com/watch?v=${trailer.key}`,
        titulo: trailer.name
      }));
    }

    return trailerInfo;
  } catch (erro) {
    console.error(erro);
  }
};

export default fetchTrailersUtils;
