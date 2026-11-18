import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/tokens.css';
import './styles/global.css';
import './styles/experience.css';
import './styles/motion.css';
import './styles/exhibition.css';
import './styles/stories.css';
import './styles/catalog.css';
import App from './app/App';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
