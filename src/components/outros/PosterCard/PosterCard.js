import { styled } from "styled-components";
import calcularBackgroundPelaNotaUtils from "../../../utils/funcoes/calcularBackgroundPelaNotaUtils";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const StyledPosterCardContainer = styled.div`
  position: relative;
  width: calc(90vw / 3);
  height: calc((90vw / 3) * 2.2);
  margin: 10px auto;

  .poster-card__tipo-midia {
    color: ${({ theme }) => theme.colors.text};
    text-transform: uppercase;
    box-sizing: border-box;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.6rem;
  }

  .poster-card__tipo-midia-p {
    padding: 5px;
  }

  .poster-card__tipo-midia-spam {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  @media screen and (min-width: 1024px) {
    width: calc(100vw / 12);
    height: calc((100vw / 12) * 2.5);

    .poster-card__tipo-midia {
      font-size: 0.5rem;
    }
  }
`;

const StyledPosterCard = styled.div`
  position: relative;
  width: calc(90vw / 3);
  margin: 10px auto;

  .poster-card__poster {
    width: 100%;
    height: calc((90vw / 3) * 1.5);
    margin: 0 auto;
    border-radius: 20px 20px 0 0;
    border: 2px solid var(--color-isabelline);
    border-bottom: none;
    box-shadow: ${({ theme }) => theme.css.sombraPadrao};
    box-sizing: border-box;
  }

  .poster-card__titulo {
    font-size: 0.6rem;
    border-radius: 0 0 20px 20px;
    border: 2px dotted var(--color-isabelline);
    border-top: none;
    box-sizing: border-box;
    box-shadow: ${({ theme }) => theme.css.sombraPadrao};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.5rem;
    margin: -0 auto;
    position: absolute;
    top: calc((90vw / 3) * 1.5);
    width: 100%;
    height: 4rem;
    font-weight: bolder;
  }

  .poster-card__nota-div {
    position: absolute;
    top: -5px;
    right: -5px;
    padding: 0.5rem;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }

  .poster-card__nota-spam {
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    padding: 10px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 1024px) {
    width: calc(100vw / 12);

    .poster-card__poster {
      height: calc((100vw / 12) * 1.5);
    }

    .poster-card__titulo {
      top: calc(((100vw / 12) * 1.5));
    }
  }
`;

const PosterCard = ({ infos }) => {
  const notaBackground = calcularBackgroundPelaNotaUtils(infos.nota);
  const notaDisplayStyle = infos.nota === "" ? "none" : "flex";

  const icone = infos.tipo === "tv" ?
  <spam className='apenas-desktop'>
    <LiveTvIcon  style={{fontSize: '2rem'}} />
  </spam>
  :
  <spam className='apenas-desktop'>
    <LocalMoviesIcon  style={{fontSize: '2rem'}} />
  </spam>

  return (
    <StyledPosterCardContainer>
      <div className="poster-card__tipo-midia">
        <p className="poster-card__tipo-midia-p">
          <spam className="poster-card__tipo-midia-spam">
          {icone}
          {infos.tipo === "tv" ? "série" : "filme"}</spam>
        </p>
      </div>
      <StyledPosterCard>
        <img
          className="poster-card__poster"
          src={infos.poster}
          alt={`Poster do ${infos.titulo}`}
        />
        <p className="poster-card__titulo">
          {infos.titulo}<br />[{infos.lancamento}]
        </p>
        <div
          className="poster-card__nota-div"
          style={{
            background: notaBackground,
            display: notaDisplayStyle,
          }}
        >
          <span className="poster-card__nota-spam">
            {Number(infos.nota).toFixed(1)}
          </span>
        </div>
      </StyledPosterCard>
    </StyledPosterCardContainer>
  );
};

export default PosterCard;
