import { api } from "../../services/api";
import fetchListaGenerosMidiasUtils from "./fetchGenerosMidiasUtils";

const fetchPesquisaUtils = async (pesquisar, anoLancamento, notaMinima) => {
  try {
    if (pesquisar === '') {
      return [];
    }

    // Função para buscar os resultados de uma página
    const buscarResultados = async (url) => {
      const resposta = await fetch(url, api);
      const dados = await resposta.json();
      return dados.results;
    };

    // Função para buscar os resultados de todas as páginas de filmes ou séries
    const buscarArrayResultados = async (baseUrl, parametroPesquisar, parametroAno) => {
      // Obter o número total de páginas de resultados
      const totalPaginas = await obterTotalPaginas(baseUrl, parametroPesquisar, parametroAno);
      // Criar as requisições para buscar as páginas de resultados
      const requisicoes = Array.from({ length: totalPaginas }, (_, i) =>
        buscarResultados(`${baseUrl}${parametroPesquisar}${parametroAno}&page=${i + 1}`)
      );
      // Realizar as requisições em paralelo
      const respostas = await Promise.all(requisicoes);
      // Obter os resultados de cada página e concatená-los em um único array
      const resultados = respostas.flatMap((dados) => dados);
      // Adicionar a propriedade 'media_type' indicando se é um filme ou série
      return resultados.map((obj) => ({
        ...obj,
        media_type: baseUrl.includes('/movie') ? 'movie' : 'tv',
      }));
    };

    // Função para obter o número total de páginas de resultados
    const obterTotalPaginas = async (baseUrl, parametroPesquisar, parametroAno) => {
      const resposta = await fetch(`${baseUrl}${parametroPesquisar}${parametroAno}&page=1`, api);
      const dados = await resposta.json();
      return dados.total_pages;
    };

    // Função para gerar o array final com os dados formatados e ordenados
    const gerarArrayFinal = (arrayResultados) => {
      return arrayResultados
        .map((item) => {
          const dataLancamento = item.media_type === 'movie' ? item.release_date : item.first_air_date;
          const lancamento = new Date(dataLancamento).toLocaleDateString('pt-BR');
          return {
            id: item.id,
            titulo: item.media_type === 'movie' ? item.title : item.name,
            tipo: item.media_type,
            poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            sinopse: item.overview,
            popularidade: item.popularity,
            lancamento,
            nota: item.vote_average,
            genero: item.genre_ids.map((idGenero) =>
              generos.find((genero) => genero.id === idGenero)?.name
            ),
          };
        })
        .sort((a, b) => new Date(b.lancamento) - new Date(a.lancamento));
    };

    // Obter a lista de gêneros de mídias
    const generos = await fetchListaGenerosMidiasUtils();

    // URLs base para buscar filmes e séries
    const baseUrlFilme = `https://api.themoviedb.org/3/search/movie?query=${pesquisar}&include_adult=false&language=pt-BR`;
    const baseUrlSerie = `https://api.themoviedb.org/3/search/tv?query=${pesquisar}&include_adult=false&language=pt-BR`;

    // Parâmetros de busca de acordo com o ano de lançamento
    const parametroAnoFilme = anoLancamento === '' ? '' : `&primary_release_year=${anoLancamento}`;
    const parametroAnoSerie = anoLancamento === '' ? '' : `&first_air_date_year=${anoLancamento}`;

    // Buscar os resultados de filmes e séries
    const arrayFilmes = await buscarArrayResultados(baseUrlFilme, parametroAnoFilme);
    const arraySeries = await buscarArrayResultados(baseUrlSerie, parametroAnoSerie);

    // Juntar os arrays de filmes e séries em um único array
    const arrayCombinado = arrayFilmes.concat(arraySeries);

    if (arrayCombinado.length === 0) {
      return [];
    }

    // Gerar o array final com os dados formatados e ordenados
    const novoArray = gerarArrayFinal(arrayCombinado);

    if (notaMinima !== '') {
      // Filtrar os resultados pelo valor mínimo de nota
      const arrayFiltrado = novoArray.filter((item) => item.nota >= parseFloat(notaMinima));
      return arrayFiltrado;
    }

    return novoArray;
  } catch (erro) {
    console.error(erro);
  }
};

export default fetchPesquisaUtils;
