import { useState, useEffect } from 'react';
import { SectionsContainer } from 'react-fullpage';
import { Section } from 'react-fullpage';
import { fetchRecomendadosUtils } from '../utils/fetch/fetchRecomendadosUtils';
import fetchLancamentosUtils from '../utils/fetch/fetchLancamentosUtils';
import fetchEmBreveUtils from '../utils/fetch/fetchEmBreveUtils';
import TituloPrincipal from '../components/formularios/componentes/TituloPrincipal/TituloPrincipal';
import Slogan from '../components/formularios/componentes/Slogan/Slogan';
import FormularioPesquisa from '../components/formularios/FormularioPesquisa/FormularioPesquisa';
import BotaoMudarTema from '../components/formularios/componentes/BotaoMudarTema/BotaoMudarTema';
import BotaoNavegacaoSecoes from '../components/formularios/componentes/BotaoNavegacaoSecoes/BotaoNavegacaoSecoes';
import { useOnOffSwitch } from '../hooks/useOnOffSwitch';
import renderizarCarrossel from '../utils/funcoes/renderizarCarrosselUtils';

const Home = ({ temaAtual, setTemaAtual }) => {
  const [listaRecomendados, setListaRecomendados] = useState([]);
  const [listaLancamentos, setListaLancamentos] = useState([]);
  const [listaEmBreve, setListaEmBreve] = useState([]);

  const [mostrarDestaques, switchMostrarDestaques] = useOnOffSwitch(false);
  const [mostrarResultado, switchMostrarResultado] = useOnOffSwitch(false);

  // Estado do carregamento da página
  const [carregandoPagina, , forceCarregandoPagina] = useOnOffSwitch(true);
  const [statusCarregamento, setStatusCarregamento] = useState(0);

  // Buscar dados da API ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatusCarregamento(33);
        const recomendadosLista = await fetchRecomendadosUtils();
        setListaRecomendados(recomendadosLista);

        setStatusCarregamento(66);
        const lancamentosLista = await fetchLancamentosUtils();
        setListaLancamentos(lancamentosLista);

        setStatusCarregamento(99);
        const emBreveLista = await fetchEmBreveUtils();
        setListaEmBreve(emBreveLista);

        forceCarregandoPagina(false);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados:', error);
        forceCarregandoPagina(true);
      }
    };

    fetchData();
  }, []);

  // Opções do componente SectionsContainer
  const fullpageOptions = {
    navigation: false,
    anchors: ['secao1'],
  };

  // Função para controlar os destaques
  const controlarDestaques = (e) => {
    e.preventDefault();
    switchMostrarDestaques();
  };

  return (
    <SectionsContainer {...fullpageOptions}>
      <Section className='secao1'>
        {carregandoPagina ? (
          <p>Carregando aplicação... {statusCarregamento}%</p>
        ) : (
          <>
            {!mostrarDestaques ? (
              <>
                {!mostrarResultado &&
                <div className='apenas-desktop'>
                  {renderizarCarrossel('Recomendados', listaRecomendados, true)}
                </div>
                }
                <TituloPrincipal conteudo='Cinepédia' />
                <Slogan />

                <FormularioPesquisa
                  mostrarResultado={mostrarResultado}
                  switchMostrarResultado={switchMostrarResultado}
                  temaAtual={temaAtual}
                />

                <BotaoMudarTema temaAtual={temaAtual} setTemaAtual={setTemaAtual} />
                <BotaoNavegacaoSecoes
                  onClick={controlarDestaques}
                  conteudo={!mostrarDestaques ? 'Ver Novidades e Próximos Lançamentos' : 'Voltar'}
                />
              </>
            ) : (
              <>
                <BotaoNavegacaoSecoes
                  onClick={controlarDestaques}
                  conteudo={!mostrarDestaques ? 'Ver Novidades e Próximos Lançamentos' : 'Voltar'}
                />
                {renderizarCarrossel('Novidades', listaLancamentos, true)}
                <br />
                {renderizarCarrossel('Em Breve', listaEmBreve, true)}
              </>
            )}
          </>
        )}
      </Section>
    </SectionsContainer>
  );
};

export default Home;
