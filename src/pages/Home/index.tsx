import React from 'react';
import { Link } from 'react-router-dom';

import Visibility from '@material-ui/icons/Visibility';

import { Button } from '../../components/Button';

import './styles.css';

function Home() {
  return (
    <main className="homeContainer">
      <img src="/logo.png" alt="Gofind" />

      <p>
        Seja bem-vindo(a) ao nosso <br /> gerenciador de contatos.
      </p>

      <Link to="/users" style={{ textDecoration: 'none' }}>
        <Button 
          type="primary"
          size={230}
          icon={<Visibility style={{ color: '#FFF', marginRight: 8 }} />}
          text="Veja a nossa lista"
        />
      </Link>
    </main>
  );
}

export { Home }