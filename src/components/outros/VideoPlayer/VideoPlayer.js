import { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  const [error, setError] = useState(null);

  const handlePlayerError = (err) => {
    setError(err);
  };

  const playerStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    boxShadow: '0 2px 8px rgba(200, 200, 200, 0.7)',
    border: '1px dotted white',
  };

  const playerStyleMobile = {
    maxWidth: '80vw',
    maxHeight: '25vh',
    margin: 'auto',
    boxShadow: '0 2px 8px rgba(200, 200, 200, 0.7)',
    border: '1px dotted white',
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {error && <p>Ocorreu um erro ao reproduzir o vídeo.</p>}
      <ReactPlayer
        url={url}
        controls
        onError={handlePlayerError}
        style={isMobile ? playerStyleMobile : playerStyle}
      />
    </>
  );
};

export default VideoPlayer;