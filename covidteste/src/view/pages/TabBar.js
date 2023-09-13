import React, { useState } from 'react';
import '../styles/TabBar.css';

function TabBar({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('statusInState');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="TabBar">
      <button
        className={activeTab === 'statusInState' ? 'active' : ''}
        onClick={() => handleTabClick('statusInState')}
      >
        Status em Estados
      </button>
      <button
        className={activeTab === 'statusInBrasil' ? 'active' : ''}
        onClick={() => handleTabClick('statusInBrasil')}
      >
        Status no Brasil
      </button>
      <button
        className={activeTab === 'statusInCountries' ? 'active' : ''}
        onClick={() => handleTabClick('statusInCountries')}
      >
        Status nos Países
      </button>
      <button
        className={activeTab === 'dataForm' ? 'active' : ''}
        onClick={() => handleTabClick('dataForm')}
      >
        Formulário
      </button>
    </div>
  );
}

export default TabBar;
