import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import Home from './pages/Home';
import { useOnOffSwitch } from './hooks/useOnOffSwitch';

function App() {
  const [tema, mudarTema] = useOnOffSwitch(true);

  return (
    <ThemeProvider theme={tema ? darkTheme : lightTheme}>

      <GlobalStyle />
      <Home
        temaAtual={tema}
        setTemaAtual={mudarTema}
      />

    </ThemeProvider>
  );
}

export default App