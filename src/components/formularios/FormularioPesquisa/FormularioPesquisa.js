import { useEffect, useState } from "react";
import styled from "styled-components";
import BotaoSubmit from "../componentes/BotaoSubmit/BotaoSubmit";
import InputPadrao from "../componentes/InputPadrao/InputPadrao";
import { useOnOffSwitch } from "../../../hooks/useOnOffSwitch";
import fetchPesquisaUtils from "../../../utils/fetch/fetchPesquisaUtils";
import renderizarCarrossel from "../../../utils/funcoes/renderizarCarrosselUtils";

const StyledFormularioPesquisa = styled.form`
  margin: 0.5rem;
`;

const FormularioPesquisa = ({mostrarResultado, switchMostrarResultado, temaAtual}) => {
  const [nomeFilmeSerie, setNomeFilmeSerie] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [notaMinima, setNotaMinima] = useState("");
  const [carregandoResultados, , forceCarregandoResultados] = useOnOffSwitch(true);
  const [listaResultado, setListaResultado] = useState([]);

  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();

  const handleNomeFilmeSerieChange = (event) => {
    setNomeFilmeSerie(event.target.value);
  };

  const handleAnoLancamentoChange = (event) => {
    setAnoLancamento(event.target.value);
  };

  const handleNotaMinimaChange = (event) => {
    setNotaMinima(event.target.value);
  };

  const fetchData = async () => {
    // Verifica se deve realizar a busca
    if (!mostrarResultado) return;

    forceCarregandoResultados(true); // Atualiza o estado para indicar que os resultados estão sendo carregados

    const fetchPesquisa = await fetchPesquisaUtils(nomeFilmeSerie, anoLancamento, notaMinima);
    if (fetchPesquisa.length !== 0) {
      setListaResultado(fetchPesquisa);
    }

    forceCarregandoResultados(false); // Atualiza o estado para indicar que os resultados foram carregados
  };

  useEffect(() => {
    fetchData(); // Chama fetchData quando os valores dos estados mudarem
  }, [mostrarResultado]);

  const handleSubmitPesquisar = (event) => {
    event.preventDefault();
    switchMostrarResultado(); // Alterna o estado para mostrar os resultados
  };

  const handleSubmitNovaPesquisa = (event) => {
    event.preventDefault();
    setNomeFilmeSerie("");
    setAnoLancamento("");
    setNotaMinima("");
    setListaResultado([]);
    switchMostrarResultado(); // Alterna o estado para ocultar os resultados e permitir uma nova pesquisa
  };

  return (
    <StyledFormularioPesquisa onSubmit={mostrarResultado ? handleSubmitNovaPesquisa : handleSubmitPesquisar}>
      {!mostrarResultado ? (

        // Formulário de pesquisa
        <>
          <InputPadrao
            tipo="text"
            placeholder="nome do filme/série*"
            valor={nomeFilmeSerie}
            onChange={handleNomeFilmeSerieChange}
            minLength={3}
            required={true}
          />
          <InputPadrao
            tipo="number"
            placeholder="ano de lançamento"
            valor={anoLancamento}
            onChange={handleAnoLancamentoChange}
            max={anoAtual}
          />
          <InputPadrao
            tipo="number"
            placeholder="nota mínima"
            valor={notaMinima}
            onChange={handleNotaMinimaChange}
            min={0}
            max={10}
          />
          <BotaoSubmit conteudo="Pesquisar" />
        </>
      ) : (
        // Resultados da pesquisa
        <>
          {listaResultado.length === 0 && !carregandoResultados ? (
            // Nenhum resultado encontrado
            <p>Desculpe, nenhum item com esses parâmetros encontrados em nossa base de dados.</p>
          ) : (
            // Resultados encontrados
            <div>
              {carregandoResultados ? (
                // Carregando resultados
                <p>Aguarde, carregando resultados...</p>
              ) : (
                // Resultados carregados
                <>
                  <h4>Resultado da Pesquisa:</h4>
                  {renderizarCarrossel('Resultado', listaResultado, false, temaAtual)}
                </>
              )}
            </div>
          )}
          <BotaoSubmit conteudo="Nova Pesquisa" />
        </>
      )}
    </StyledFormularioPesquisa>
  );
};

export default FormularioPesquisa;
