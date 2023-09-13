import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "../styles/StatusInCountries.css";

const StatusInCountries: React.FC = () => {
  /* States utilizados */
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [covidData, setCovidData] = useState<any | null>(null);
  const [allCountries, setAllCountries] = useState<any[]>([]);

  /* UseEffect usado para puxar os dados da api e jogar nos states */
  useEffect(() => {
    axios
      .get("https://covid19-brazil-api.now.sh/api/report/v1/countries")
      .then((response) => {
        const data = response.data;
        const countriesData = data.data.map((countryData: any) => ({
          label: countryData.country,
          value: countryData.country,
          data: countryData,
        }));
        setAllCountries(countriesData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    setCovidData(selectedOption ? selectedOption.data : null);
  };

  return (
    <div className="CountrieMain">
      <div className="CountrieContainer">
        <div className="Line" />
        <h2>Consultar Status da COVID-19 em Outros Países</h2>
        {/* Usei e biblioteca Select para fazer a função de um select juntamente a um filtro por Digitação*/}
        <Select
          options={allCountries}
          isSearchable={true}
          placeholder="Digite ou selecione um país"
          onChange={handleCountryChange}
          value={selectedCountry}
        />
      </div>
      {covidData && (
        <div className="CountriesContainerInfo">
          <h2 className="LabelColor">{covidData.country}</h2>
          <div className="StateContainerInfoBox">
            <div className="StateContainerInfoLabel">Confirmados</div>
            <div className="StateContainerInfoText">{covidData.confirmed}</div>
          </div>
          <div className="StateContainerInfoBox">
            <div className="StateContainerInfoLabel">Nº mortes</div>
            <div className="StateContainerInfoText">{covidData.deaths}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusInCountries;
