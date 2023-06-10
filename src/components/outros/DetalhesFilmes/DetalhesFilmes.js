import React, { useEffect, useState } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styled from 'styled-components';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import calcularBackgroundPelaNotaUtils from '../../../utils/funcoes/calcularBackgroundPelaNotaUtils';
import BotaoNavegacaoSecoes from '../../formularios/componentes/BotaoNavegacaoSecoes/BotaoNavegacaoSecoes';
import fetchTrailersUtils from '../../../utils/fetch/fetchTrailersUtils';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import fetchProvidersFilmeUtils from '../../../utils/fetch/fetchProvidersFilmeUtils';
import fetchProvidersSerieUtils from '../../../utils/fetch/fetchProvidersSerieUtils';
import BotaoFechar from '../../formularios/componentes/BotaoFechar/BotaoFechar';

const StyledDialog = styled(Dialog)`
  && {
    width: 85%;
    background-color: ${({ theme }) => theme.colors.backgroundTransparencia};
    background-image: ${({ theme }) => theme.css.backgroundImage};
    padding: 20px;
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.css.sombraPadrao};
    padding: 20px;
    margin: 5px auto;

    .detalhes-filme__dica {
      font-size: 0.7rem;
    }

    hr {
      border-color: ${({ theme }) => theme.colors.text};
    }

    .detalhes__nota-div{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin: auto;
      border-radius: 50%;
    }

    .detalhes__nota-p{
      background-color: ${({ theme }) => theme.colors.background};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media screen and (min-width: 1024px) {
      width: 50%;
    }
  }
`;

const StyledProviderTable = styled.table`
  margin: 0 auto 10px auto;
  padding: 8px;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.css.sombraPadrao};
`;

const StyledProviderCell = styled.td`
  padding: 10px;
  text-align: center;
`;

const StyledProviderLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.css.sombraAlternativa};
`

const DetalhesFilmes = ({ filme, closeModal }) => {

  const [listaTrailers, setListaTrailers] = useState([]);
  const [listaProviders, setListaProviders] = useState([]);

  const notaBackground = calcularBackgroundPelaNotaUtils(filme.nota);
  const notaDisplayStyle = filme.nota === "" ? "none" : "flex";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trailersLista = await fetchTrailersUtils(filme.id, filme.tipo);
        setListaTrailers(trailersLista);

        const fetchProviders = filme.media_type === 'tv'
          ? await fetchProvidersSerieUtils(filme.id)
          : await fetchProvidersFilmeUtils(filme.id);
        setListaProviders(fetchProviders);

      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  const getLogoUrl = (logoPath) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w200';
    return baseUrl + logoPath;
  };

  return (
    <StyledDialog isOpen onDismiss={closeModal}>

      <div className='apenas-desktop'>
        <BotaoFechar onClick={closeModal}/>
        <p className='detalhes-filme__dica'>Dica: pressione ESC ou clique fora da janela para fechar.</p>
      </div>

      <div className='apenas-mobile'>
        <BotaoFechar onClick={closeModal}/>
      </div>

      <hr />
      <h2>{filme.titulo}</h2>
      <h3>
        {filme.tipo === "tv" ? <LiveTvIcon /> : <LocalMoviesIcon />}<br />
        {filme.tipo === "tv" ? "Série" : "Filme"}
      </h3>
      <div
        className='detalhes__nota-div'
        style={{
          background: notaBackground,
          display: notaDisplayStyle,
        }}>
        <p className='detalhes__nota-p'>{Number(filme.nota).toFixed(1)}</p>
      </div>
      <h4>Gênero(s): {filme.genero.map((genero) => <> {genero} </>)}</h4>
      <p>Data de Lançamento: {filme.lancamento}</p>
      <p>Sinopse: {filme.sinopse}</p>

      {listaTrailers.map((trailer, index) => (
        <div key={`trailer`+filme.id+index}>
          <h5>Trailer {index + 1} - {trailer.titulo}</h5>
          <VideoPlayer url={trailer.linkYT}/>
        </div>
      ))}

      {listaProviders.streaming?.length > 0 && (
          <div>
            <h4>Streaming:</h4>
            <StyledProviderTable>
              <tbody>
                <tr>
                  {listaProviders.streaming.map((stream, index) => (
                    <StyledProviderCell key={`streaming-${index}`}>
                      <StyledProviderLogo src={getLogoUrl(stream[index].logo_path)} alt={stream[index].provider_name} />
                      <br />
                      <span>{stream[index].provider_name}</span>
                    </StyledProviderCell>
                  ))}
                </tr>
              </tbody>
            </StyledProviderTable>
          </div>
        )}

        {listaProviders.alugar?.length > 0 && (
          <div>
            <h4>Alugar:</h4>
            <StyledProviderTable>
              <tbody>
                <tr>
                  {listaProviders.alugar.map((rent, index) => (
                    <StyledProviderCell key={`alugar-${index}`}>
                      <StyledProviderLogo src={getLogoUrl(rent[index].logo_path)} alt={rent[index].provider_name} />
                      <br />
                      <span>{rent[index].provider_name}</span>
                    </StyledProviderCell>
                  ))}
                </tr>
              </tbody>
            </StyledProviderTable>
          </div>
        )}

        {listaProviders.comprar?.length > 0 && (
          <div>
            <h4>Comprar:</h4>
            <StyledProviderTable>
              <tbody>
                <tr>
                  {listaProviders.comprar.map((buy, index) => (
                    <StyledProviderCell key={`comprar-${index}`}>
                      <StyledProviderLogo src={getLogoUrl(buy[index].logo_path)} alt={buy[index].provider_name} />
                      <br />
                      <span>{buy[index].provider_name}</span>
                    </StyledProviderCell>
                  ))}
                </tr>
              </tbody>
            </StyledProviderTable>
          </div>
        )}

        {listaProviders.ads?.length > 0 && (
          <div>
            <h4>ads:</h4>
            <StyledProviderTable>
              <tbody>
                <tr>
                  {listaProviders.ads.map((ads, index) => (
                    <StyledProviderCell key={`ads-${index}`}>
                      <StyledProviderLogo src={getLogoUrl(ads[index].logo_path)} alt={ads[index].provider_name} />
                      <br />
                      <span>{ads[index].provider_name}</span>
                    </StyledProviderCell>
                  ))}
                </tr>
              </tbody>
            </StyledProviderTable>
          </div>
        )}


    </StyledDialog>
  );
};

export default DetalhesFilmes;



