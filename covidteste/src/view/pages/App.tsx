import React, { useState } from 'react';
import '../styles/App.css';
import StatusInState from '../components/StatusInState';
import StatusInBrasil from '../components/StatusInBrasil';
import StatusInCountries from '../components/StatusInCountries';
import DataForm from '../components/DataForm';
import TabBar from './TabBar';


function App() {
  const [activeTab, setActiveTab] = useState('statusInState');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <div className='AppHeaderLine'/>
      <div className="AppTitle">COVID-19 Dashboard</div>
      <div className='AppHeaderLine'/>
      <TabBar onTabChange={handleTabChange} />
      <div className="Content">
        {activeTab === 'statusInState' && <StatusInState />}
        {activeTab === 'statusInBrasil' && <StatusInBrasil />}
        {activeTab === 'statusInCountries' && <StatusInCountries />}
        {activeTab === 'dataForm' && <DataForm />}
      </div>
    </div>
  );
}

export default App;
