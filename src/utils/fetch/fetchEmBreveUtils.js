import { api } from "../../services/api";
import fetchListaGenerosMidiasUtils from "./fetchGenerosMidiasUtils";

// Função assíncrona que busca filmes em breve
const fetchFilmesEmBreve = async () => {
  try {
    // Obtém a data atual
    const dataAtual = new Date();
    // Define a data inicial como a data atual + 1 dia
    const dataInicial = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate() + 1);
    // Define a data limite como a data inicial + 14 dias
    const dataLimite = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate() + 14);

    // Formata as datas para o formato "AAAA-MM-DD"
    const dataInicialFormatada = formatarData(dataInicial);
    const dataLimiteFormatada = formatarData(dataLimite);

    // Busca os filmes usando as datas formatadas
    const resposta = await buscarFilmes(dataInicialFormatada, dataLimiteFormatada);
    const dados = await resposta.json();

    // Verifica se não há dados e retorna um array vazio
    if (dados === '') {
      return [];
    }

    // Obtém o número total de páginas
    const totalPaginas = dados.total_pages;

    // Cria as promises para buscar filmes em cada página
    const promessasFilmes = criarPromessasFilmes(totalPaginas, dataInicialFormatada, dataLimiteFormatada);
    const respostasFilmes = await Promise.all(promessasFilmes);
    const dadosFilmes = await Promise.all(respostasFilmes.map(resposta => resposta.json()));
    const arrayFilmes = dadosFilmes.flatMap(dados => dados.results);

    // Obtém os gêneros correspondentes aos IDs
    const generos = await fetchListaGenerosMidiasUtils();

    // Cria um novo array com os campos necessários, incluindo os nomes dos gêneros
    const novoArray = arrayFilmes
      .filter(item => item.poster_path) // Filtra os filmes que têm imagem de poster
      .map((item) => {
        const dataLancamento = item.release_date;
        const lancamento = new Date(dataLancamento).toLocaleDateString('pt-BR');
        return {
          id: item.id,
          titulo: item.title,
          tipo: "movie",
          poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          sinopse: item.overview,
          popularidade: item.popularity,
          lancamento: lancamento,
          nota: item.vote_average === 0 ? '' : item.vote_average,
          genero: item.genre_ids.map((idGenero) =>
            generos.find((genero) => genero.id === idGenero)?.name
          ),
        };
      });


    return novoArray;

  } catch (erro) {
    console.error(erro);
  }
};

// Função auxiliar para formatar uma data no formato "AAAA-MM-DD"
const formatarData = (data) => {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

// Função para buscar filmes usando a data inicial e a data limite
const buscarFilmes = (dataInicial, dataLimite) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_date.gte=${dataInicial}&primary_release_date.lte=${dataLimite}&sort_by=primary_release_date.asc`, api);
};

// Função para criar as promises de busca de filmes em cada página
const criarPromessasFilmes = (totalPaginas, dataInicial, dataLimite) => {
  const promessasFilmes = [];
  for (let i = 1; i <= totalPaginas; i++) {
    promessasFilmes.push(buscarFilmesPagina(i, dataInicial, dataLimite));
  }
  return promessasFilmes;
};

// Função para buscar filmes de uma determinada página usando a data inicial e a data limite
const buscarFilmesPagina = (pagina, dataInicial, dataLimite) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${pagina}&primary_release_date.gte=${dataInicial}&primary_release_date.lte=${dataLimite}&sort_by=primary_release_date.asc`, api);
};

export default fetchFilmesEmBreve;
