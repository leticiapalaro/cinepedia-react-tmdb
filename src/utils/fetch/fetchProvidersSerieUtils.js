import { api } from "../../services/api";

const fetchProvidersSerieUtils = async (filmeID) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${filmeID}/watch/providers`, api);
    const data = await response.json();

    if (!data.results || !data.results.BR) {
      return {
        alugar: [],
        comprar: [],
        streaming: [],
        gratis: [],
      };
    }

    const providers = data.results.BR;

    const providersInfo = {};

    // Verifica se a propriedade "rent" existe em providers
    // Se existir, mapeia os objetos em providers.rent para o formato desejado
    // Caso contrário, atribui um array vazio
    providersInfo.alugar = providers.rent ? providers.rent.map((rent, index) => ({
      [index]: {
        logo_path: rent.logo_path,
        provider_name: rent.provider_name
      }
    })) : [];

    // Verifica se a propriedade "buy" existe em providers
    // Se existir, mapeia os objetos em providers.buy para o formato desejado
    // Caso contrário, atribui um array vazio
    providersInfo.comprar = providers.buy ? providers.buy.map((buy, index) => ({
      [index]: {
        logo_path: buy.logo_path,
        provider_name: buy.provider_name
      }
    })) : [];

    // Verifica se a propriedade "flatrate" existe em providers
    // Se existir, mapeia os objetos em providers.flatrate para o formato desejado
    // Caso contrário, atribui um array vazio
    providersInfo.streaming = providers.flatrate ? providers.flatrate.map((flatrate, index) => ({
      [index]: {
        logo_path: flatrate.logo_path,
        provider_name: flatrate.provider_name
      }
    })) : [];

    // Verifica se a propriedade "ads" existe em providers
    // Se existir, mapeia os objetos em providers.ads para o formato desejado
    // Caso contrário, atribui um array vazio
    providersInfo.gratis = providers.ads ? providers.ads.map((ads, index) => ({
      [index]: {
        logo_path: ads.logo_path,
        provider_name: ads.provider_name
      }
    })) : [];

    return providersInfo;
  } catch (err) {
    console.error(err);
  }
};

export default fetchProvidersSerieUtils;
