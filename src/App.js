import React from 'react';
import Header from './components/Header';
import DecivesHeader from './components/DataTable/DevicesHeader';
import DataTable from './components/DataTable/DataTable';

function App() {
  return (
    <div>
      <Header />
      <main>
        <DecivesHeader />
        <DataTable />
      </main>
    </div>
  );
}

export default App;