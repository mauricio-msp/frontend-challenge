import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Search from '@material-ui/icons/Search';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { AlertCustom } from '../../components/Alert';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ListUsers } from '../../components/ListUsers';

import { api } from '../../services/api';
import { nameCapitalized } from '../../utils/nameCapitalized';

import './styles.css';
import { Link } from 'react-router-dom';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const CssTextField = withStyles({
  root: {
    '&': {
      width: 300,
    },
    '& + &': {
      marginLeft: 10,
    },
    '& label.Mui-focused': {
      color: '#000',
      fontWeight: 'bold',
    },
    '& .MuiInput-underline:after': {
      borderColor: '#C4C4C4',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#C4C4C4',
      },
      '&:hover fieldset': {
        borderColor: '#C4C4C4',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#C4C4C4',
      },
    },
  },
})(TextField);

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  async function listUsers() {
    const response = await api.get('/users');

    const { data } = response.data;

    setUsers(data);
  }

  function searchUser() {
    if (name === '' && email === '') {
      setIsAlert(true);
      return;
    }

    if (name) {
      const nameAltered = nameCapitalized(name);

      const user = users.filter(
        (user) => user.first_name === nameAltered || user.last_name === nameAltered
      );

      setUsers(user);
    }

    if (email) {
      const user = users.filter(
        (user) => user.email === email
      );

      setUsers(user);
    } 
  }

  useEffect(() => {
    listUsers();
  }, [])

  useEffect(() => {
    if (name === '' && email === '') {
      listUsers();
    }
  }, [name, email]);

  return (
    <>
      <Header />

      <main className="mainContainer">
        <Link 
          to="/" 
          style={{ textDecoration: 'none', marginBottom: 10, marginTop: -35 }}
        >
          <Button 
            type="secondary"
            text="Voltar"
            size={120}
            bordered
            icon={<ArrowBack style={{ color: '#424242', marginRight: 8 }} />}
          />
        </Link>

        <div className="boxContainer">
          <span className="titleContainer">Busca</span>

          <div className="inputGroup">
            <CssTextField 
              label="Nome do usuário" 
              placeholder="Buscar por nome ou sobrenome..." 
              variant="outlined" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <CssTextField 
              label="E-mail" 
              placeholder="Buscar por email" 
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <AlertCustom 
            type="warning"
            message="Por favor, verifique se pelo menos um dos campos estão preenchidos."
            open={isAlert}
            close={() => setIsAlert(false)}
          />

          <Button 
            type="primary"
            text="Buscar"
            size={120}
            icon={<Search style={{ color: '#FFF', marginRight: 8 }} />}
            onClick={() => searchUser()} 
          />
        </div>

        <Button 
          bordered
          type="secondary"
          text="Adicionar usuário"
          size={230}
          icon={<PersonAdd style={{ color: '#424242', marginRight: 8 }} />}
        />

        <ListUsers users={users} />
      </main>
    </>
  )
}

export { Users }