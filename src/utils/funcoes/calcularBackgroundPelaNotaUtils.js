const calcularBackgroundPelaNotaUtils = (nota) => {
  let backgroundCalc = '';
  const angulo = (360 * (nota * 0.1));

  if (nota === 10) {
    backgroundCalc = `conic-gradient(
      blue 0deg,
      #40E0D0 108deg,
      #ADFF2F 288deg,
      #7FFF00 324deg,
      #00FF00 360deg)`;
  } else if (nota > 9) {
    backgroundCalc = `conic-gradient(
      blue 0deg,
      #40E0D0 108deg,
      #ADFF2F 288deg,
      #7FFF00 324deg,
      #00FF00  ${angulo}deg,
      transparent ${angulo + 1}deg,
      transparent 0deg)`;
  } else if (nota > 8) {
    backgroundCalc = `conic-gradient(
      blue 0deg,
      #40E0D0 108deg,
      #ADFF2F 288deg,
      #7FFF00 324deg,
      #7FFF00  ${angulo}deg,
      transparent ${angulo + 1}deg,
      transparent 0deg)`;
  } else if (nota > 7) {
    backgroundCalc = `conic-gradient(
      blue 0deg,
      #40E0D0 108deg,
      #F3D900 288deg,
      #ADFF2F  ${angulo}deg,
      transparent ${angulo + 1}deg,
      transparent 0deg)`;
  } else if (nota > 5) {
    backgroundCalc = `conic-gradient(
      red 0deg,
      red 150deg,
      #F3D900 216deg,
      #F3D900  ${angulo}deg,
      transparent ${angulo + 1}deg,
      transparent 0deg)`;
  } else {
    backgroundCalc = `conic-gradient(
      red 0deg,
      red ${angulo}deg,
      transparent ${angulo + 1}deg,
      transparent 0deg)`;
  }

  return backgroundCalc;
};

export default calcularBackgroundPelaNotaUtils;