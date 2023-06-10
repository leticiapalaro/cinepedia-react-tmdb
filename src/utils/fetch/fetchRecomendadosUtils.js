import { api } from "../../services/api";
import fetchListaGenerosMidiasUtils from "./fetchGenerosMidiasUtils";

export const fetchRecomendadosUtils = async () => {
  try {
    // Faz a requisição para obter os dados de trending
    const resposta = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=pt-BR&sort_by=popularity.desc",
      api
    );
    const dados = await resposta.json();

    // Verifica se não há dados e retorna um array vazio
    if (dados === '') {
      return [];
    }

    const totalPaginas = Math.min(dados.total_pages, 50);

    // Cria as promessas para buscar listas em cada página
    const promessasListas = Array.from({ length: totalPaginas }, (_, i) =>
      fetch(
        `https://api.themoviedb.org/3/trending/all/week?language=pt-BR&sort_by=popularity.desc&page=${i + 1}`,
        api
      )
    );

    // Realiza as requisições em paralelo
    const respostasListas = await Promise.all(promessasListas);
    const dadosListas = await Promise.all(respostasListas.map((resposta) => resposta.json()));

    // Concatena todos os resultados em um único array
    const listaArray = dadosListas.flatMap((dados) => dados.results);

    // Obtém os gêneros correspondentes aos IDs
    const generos = await fetchListaGenerosMidiasUtils();

    // Cria o novo array com os campos necessários, incluindo os nomes dos gêneros
    const novoArray = listaArray
      .filter((item) => item.poster_path && item.vote_average >= 8) // Filtra itens com poster e nota maior ou igual a 8
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
      .sort((a, b) => new Date(b.lancamento) - new Date(a.lancamento)); // Ordena o array pela data de lançamento

    // Retorna o novo array
    return novoArray;
  } catch (erro) {
    console.error(erro);
  }
};

export default fetchRecomendadosUtils