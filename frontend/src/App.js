import React from 'react';
import Header from './Header/Header';
import ContentSection from './ContentSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-4.7/css/font-awesome.min.css';

import './css/common.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ContentSection />
    </div>
  );
}

export default App;
