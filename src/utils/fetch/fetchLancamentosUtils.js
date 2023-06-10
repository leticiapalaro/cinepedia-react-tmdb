import { api } from "../../services/api";
import fetchGenerosMidiasUtils from "./fetchGenerosMidiasUtils";

const fetchLancamentosUtils = async () => {
  try {
    // Realiza uma requisição para obter os lançamentos da semana em português
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=pt-BR&sort_by=popularity.desc",
      api
    );
    const data = await response.json();

    // Verifica se não há dados e retorna um array vazio
    if (data === '') {
      return [];
    }

    // Limita o número de páginas a serem consideradas para no máximo 50
    const totalPaginas = Math.min(data.total_pages, 50);

    // Cria as promises para buscar listas em cada página
    const listasPromises = Array.from({ length: totalPaginas }, (_, i) =>
      fetch(
        `https://api.themoviedb.org/3/trending/all/week?language=pt-BR&sort_by=popularity.desc&page=${i + 1}`,
        api
      )
    );

    // Realiza as requisições em paralelo
    const listasResponses = await Promise.all(listasPromises);
    const listasData = await Promise.all(listasResponses.map((response) => response.json()));

    // Concatena todos os resultados em um único array
    const listaArray = listasData.flatMap((data) => data.results);

    // Obtém os gêneros correspondentes aos IDs
    const generos = await fetchGenerosMidiasUtils();

    // Cria o novo array com os campos necessários, incluindo os nomes dos gêneros
    const novoArray = listaArray
      .filter((item) => item.poster_path) // Filtra itens sem poster
      .map((item) => {
        const { media_type, title, name, poster_path, overview, popularity, vote_average, genre_ids, release_date, first_air_date } = item;
        const dataLancamento = media_type === "movie" ? release_date : first_air_date;
        const lancamento = new Date(dataLancamento).toLocaleDateString('pt-BR');
        const genero = genre_ids.map((genreId) =>
          generos.find((genre) => genre.id === genreId)?.name
        );
        return {
          id: item.id,
          titulo: media_type === "movie" ? title : name,
          tipo: media_type,
          poster: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          sinopse: overview,
          popularity: popularity,
          lancamento: lancamento,
          nota: vote_average,
          genero,
        };
      })
      .filter((item) => {
        const hoje = new Date();
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - 90);
        const dataLancamento = new Date(item.lancamento);
        return dataLancamento >= dataLimite && dataLancamento <= hoje;
      })
      .sort((a, b) => new Date(b.lancamento) - new Date(a.lancamento));

    // Retorna o novo array contendo os lançamentos com as informações necessárias
    return novoArray;
  } catch (err) {
    // Em caso de erro, exibe o erro no console
    console.error(err);
  }
};

export default fetchLancamentosUtils;
