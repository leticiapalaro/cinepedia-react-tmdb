import { useState } from "react";

export const useOnOffSwitch = (estadoInicial) => {

  const [estado, setEstado] = useState(estadoInicial);

  const toggleSwitch = () => {
    setEstado(!estado)
  };

  const forceSwitch = (state) => setEstado(state)

  return [estado, toggleSwitch, forceSwitch]
}