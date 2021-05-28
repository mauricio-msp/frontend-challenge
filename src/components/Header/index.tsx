import React from 'react';

import './styles.css';

function Header() {
  return (
    <header className="headerContainer">
      <div className="imgContainer">
        <img src="/logo.png" alt="Gofind" />
      </div>
    </header>
  );
}

export { Header }