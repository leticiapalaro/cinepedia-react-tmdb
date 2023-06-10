import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import DetalhesFilmes from '../../outros/DetalhesFilmes/DetalhesFilmes';
import PosterCard from '../../outros/PosterCard/PosterCard';

const BaseCarrossel = ({ nomeLista, lista, autoPlay, temaAtual }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const carouselOptions = {
    autoPlay: autoPlay,
    autoPlayInterval: 2000,
    infinite: true,
    disableDotsControls: true,
    mouseTracking: true,
    responsive: {
      0: {
        items: 3 > lista.length ? lista.length : 3,
      },
      768: {
        items: 3 > lista.length ? lista.length : 3,
      },
      1024: {
        items: 10 > lista.length ? lista.length : 10,
      },
    },
    renderPrevButton: () => (
      <div
        className="custom-prev-button"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '5px',
          transform: 'translateY(-50%)',
        }}
      >
        <ArrowCircleLeftSharpIcon
          style={{
            fontSize: '3rem',
          }}
        />
      </div>
    ),
    renderNextButton: () => (
      <div
        className="custom-next-button"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          right: '5px',
          transform: 'translateY(-50%)',
        }}
      >
        <spam style={{fontSize: '0.8rem'}}>{nomeLista}: {lista.length} resultado(s) encontrado(s)
        <ArrowCircleRightSharpIcon
          style={{
            fontSize: '3rem',
          }}
        /></spam>
      </div>
    ),
  };

  return (
    <>
      <AliceCarousel {...carouselOptions}>
        {lista.map((item, index) => (
          <div key={`${nomeLista}${item.id}`} onClick={() => handleItemClick(index)}>
            <PosterCard
              infos={item}
            />
          </div>
        ))}
      </AliceCarousel>
      {selectedItem !== null && (
        <DetalhesFilmes
          filme={lista[selectedItem]}
          closeModal={handleModalClose}
          temaAtual={temaAtual}
        />
      )}
    </>
  );
};

export default BaseCarrossel;
