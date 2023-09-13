import React, { useState } from "react";

import "../styles/DataForm.css";

const DataForm: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    state: "",
    cases: "",
    confirmed: "",
    deaths: "",
    recovered: "",
    date: "",
  });
  const [jsonResult, setJsonResult] = useState<string | null>(null);

  const handleSubmit = () => {
    // Faça a validação dos dados do formulário aqui.
    if (
      formData.state &&
      formData.cases > 0 &&
      formData.confirmed > 0 &&
      formData.deaths >= 0 &&
      formData.recovered >= 0 &&
      formData.date
    ) {
      // Se os dados forem válidos, crie o JSON e exiba-o.
      const jsonData = JSON.stringify(formData);
      setJsonResult(jsonData);
    } else {
      // Caso contrário, exiba uma mensagem de erro.
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
    }
  };

  // Dados do select dos Estados
  // Uma lista de estados é definida para ser usada no elemento 'select'.
  // Isso permite que o usuário escolha um estado a partir de uma lista predefinida.
  // Os valores dessa lista são mapeados para opções no elemento 'select'.
  const states = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  return (
    <div className="DataFormContainer">
      <div className="Line" />
      <h2 className="DataFormTitle">Preencher Dados da COVID-19</h2>
      <form className="DataForm">
          <div className="FormGroup">
            <select
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
              className="FormControl"
            >
              <option value="">Selecione um estado</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="FormGroup">
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              className="FormControl"
            />
          </div>
        

        <div className="FormGroup">
          <input
            placeholder="Nº Casos"
            type="number"
            value={formData.cases}
            onChange={(e) =>
              setFormData({ ...formData, cases: parseInt(e.target.value) })
            }
            required
            className="FormControl"
          />
        </div>

        <div className="FormGroup">
          <input
            placeholder="Nº Confirmados"
            type="number"
            value={formData.confirmed}
            onChange={(e) =>
              setFormData({ ...formData, confirmed: parseInt(e.target.value) })
            }
            required
            className="FormControl"
          />
        </div>

        <div className="FormGroup">
          <input
            placeholder="Nº Mortes"
            type="number"
            value={formData.deaths}
            onChange={(e) =>
              setFormData({ ...formData, deaths: parseInt(e.target.value) })
            }
            required
            className="FormControl"
          />
        </div>

        <div className="FormGroup">
          <input
            placeholder="Nº Recuperados"
            type="number"
            value={formData.recovered}
            onChange={(e) =>
              setFormData({ ...formData, recovered: parseInt(e.target.value) })
            }
            required
            className="FormControl"
          />
        </div>

        <button type="button" onClick={handleSubmit} className="SubmitButton">
          Enviar
        </button>
      </form>

      {jsonResult && (
        <div className="json-result">
          <h3>JSON Gerado:</h3>
          <pre>{jsonResult}</pre>
        </div>
      )}
    </div>
  );
};

export default DataForm;
