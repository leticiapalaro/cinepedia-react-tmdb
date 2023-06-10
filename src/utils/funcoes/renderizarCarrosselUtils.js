import BaseCarrossel from "../../components/carrosseis/BaseCarrosel/BaseCarrossel";

const renderizarCarrossel = (nomeLista, lista, autoPlay, temaAtual) => (
  <div>
    <BaseCarrossel
      nomeLista={nomeLista}
      lista={lista}
      autoPlay={autoPlay}
      temaAtual={temaAtual}/>
  </div>
);

export default renderizarCarrossel