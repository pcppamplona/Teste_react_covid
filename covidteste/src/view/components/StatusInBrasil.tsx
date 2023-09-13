import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/StatusInBrasil.css";

const StatusInBrasil: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [covidData, setCovidData] = useState<any[]>([]);
  const [allStates, setAllStates] = useState<string[]>([]);
  const [showStateFilter, setShowStateFilter] = useState<boolean>(false);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setShowStateFilter(false); // Oculta o filtro quando a data é alterada
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const fetchDataByDate = () => {
    if (selectedDate) {
      axios
        .get(
          `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${selectedDate}`
        )
        .then((response) => {
          const data = response.data;
          if (data.data.length === 0) {
            alert("Não há relatório para a data especificada.");
          } else {
            setCovidData(data.data);
            setShowStateFilter(true); // Mostra o filtro após a seleção da data
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados da API:", error);
        });
    }
  };

  useEffect(() => {
    // Carrega os nomes de todos os estados ao iniciar o componente
    axios
      .get("https://covid19-brazil-api.now.sh/api/report/v1")
      .then((response) => {
        const data = response.data.data;
        const stateNames = data.map((item: any) => item.uf);
        setAllStates(stateNames);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  const filteredData = selectedState
    ? covidData.filter((item) => item.uf === selectedState)
    : covidData;

  return (
    <div className="StatusBrasilMain">
      <div className="StatusBrasilContainer">
        <div className="Line" />
        <h2>Listar Casos de COVID-19 no Brasil por Data e Estado</h2>
        <div className="DateLabel">Data (YYYYMMDD):</div>
        <input
          placeholder="20200318"
          className="DateInput"
          type="text"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button className="SearchButton" onClick={fetchDataByDate}>
          Buscar
        </button>

        {showStateFilter && (
          <div>
            {/* Dropdown para selecionar um estado */}
            <select
              className="CustomSelect"
              onChange={handleStateChange}
              value={selectedState}
            >
              <option value="">Todos os estados</option>
              {allStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {covidData.length > 0 && (
        <div className="ListInfoStates">
          <div className="ListInfoStatesTitle">
            <b>Relatório para a Data:</b> {selectedDate}
          </div>

          {filteredData.map((item: any) => (
            <div className="ListInfoStatesItems" key={item.uid}>
              <h2 className="LabelColor">{item.uf}</h2>
              <div className="StateContainerInfoBox">
                <div className="StateContainerInfoLabel">Nº Casos</div>
                <div className="StateContainerInfoText">{item.cases}</div>
              </div>
              <div className="StateContainerInfoBox">
                <div className="StateContainerInfoLabel">Nº Mortes</div>
                <div className="StateContainerInfoText">{item.deaths}</div>
              </div>
              <div className="StateContainerInfoBox">
                <div className="StateContainerInfoLabel">Nº Suspeitos</div>
                <div className="StateContainerInfoText">{item.suspects}</div>
              </div>
              <div className="StateContainerInfoBox">
                <div className="StateContainerInfoLabel">Recusas</div>
                <div className="StateContainerInfoText">{item.refuses}</div>
              </div>
              <div className="StateContainerInfoBox">
                <div className="StateContainerInfoLabel">Data e Hora</div>
                <div className="StateContainerInfoText">{item.datetime}</div>
              </div>

              {/* <div>
                <b>UF: </b>
                {item.uf}
              </div>
              <div>
                <b>Casos:</b> {item.cases}
              </div>
              <div>
                <b>Mortes: </b>
                {item.deaths}
              </div>
              <div>
                <b>Suspeitas:</b> {item.suspects}
              </div>
              <div>
                <b>Recusas:</b> {item.refuses}
              </div>
              <div>
                <b>Data e Hora:</b> {item.datetime}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusInBrasil;
