import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/StatusInState.css";

// Um array de objetos que contém valores e rótulos de estados do Brasil
const states = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const StatusInState: React.FC = () => {
  // Estados locais para armazenar a seleção de estado e dados do COVID-19
  const [selectedState, setSelectedState] = useState<string>("");
  const [covidData, setCovidData] = useState<any | null>(null);

  // Manipulador de mudança de estado selecionado
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  // Efeito colateral que é executado quando o estado selecionado muda
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${selectedState}`
        )
        .then((response) => {
          const data = response.data;
          setCovidData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados da API:", error);
        });
    }
  }, [selectedState]);

  return (
    <div className="StateMain">
      <div className="StateContainer">
        <div className="Line" />
        <h2>Visualizar Status do COVID-19 por Estado</h2>
        <select
          className="CustomSelect"
          onChange={handleStateChange}
          value={selectedState}
        >
          <option value="">Selecione um estado</option>
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>
      {covidData && (
        <div className="StateContainerInfo">
          <h2 className="LabelColor">{covidData.state}</h2>
          <div className="StateContainerInfoBox">
            <div className="StateContainerInfoLabel">Nº Casos</div>
            <div className="StateContainerInfoText">{covidData.cases}</div>
          </div>
          <div className="StateContainerInfoBox">
            <div className="StateContainerInfoLabel">Nº mortes</div>
            <div className="StateContainerInfoText">{covidData.deaths}</div>
          </div>
          <div className="StateContainerInfoBox">
            <div className="StateContainerInfoLabel">Nº suspeitos</div>
            <div className="StateContainerInfoText">{covidData.suspects}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusInState;
