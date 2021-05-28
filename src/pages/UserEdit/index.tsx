import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import SaveAlt from '@material-ui/icons/SaveAlt';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { AlertCustom } from '../../components/Alert';

import { api } from '../../services/api';

import './styles.css';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

type ParamsProps = {
  userId: string;
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

function UserEdit() {
  const { userId } = useParams<ParamsProps>();

  const [isSave, setIsSave] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<User>({ 
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '', 
  });

  async function saveUser() {
    const response = await api.put(`/users/${userId}`, user);
    
    if (response.status === 200) {
      setUser(user);
      setIsSave(true);
    } else {
      setIsError(true);
    }
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(`/users/${userId}`);

      const { data } = response.data;

      setUser(data);
    })()
  }, [userId])

  return (
    <>
      <Header />

      <div className="formContainer">
        <Link to="/users" style={{ textDecoration: 'none', marginBottom: 20 }}>
          <Button 
            type="secondary"
            text="Voltar"
            size={120}
            bordered
            icon={<ArrowBack style={{ color: '#424242', marginRight: 8 }} />}
          />
        </Link>

        <div className="boxContainer">
          <span className="titleContainer">
            Atualize seus dados
          </span>

          <div className="profileContainer">
            <Avatar 
              alt={user?.first_name} 
              src={user?.avatar} 
              style={{ width: 100, height: 100 }} 
            />

            <div className="detailProfile">
              <span className="nameProfile">
                {user?.first_name} {user?.last_name}
              </span>

              <span className="emailProfile">
                {user?.email}
              </span>
            </div>
          </div>
    
          <div className="inputGroupUpdate">
            <CssTextField
              disabled 
              label="ID" 
              variant="outlined" 
              value={user?.id}
              style={{ width: 280 }}
            />
            <CssTextField 
              label="Primeiro nome" 
              placeholder="Informe o seu primeiro nome" 
              variant="outlined" 
              value={user?.first_name}
              onChange={e => setUser({ ...user, first_name: e.target.value })}
            />
            <CssTextField 
              label="Último nome" 
              placeholder="Informe o seu ultimo nome" 
              variant="outlined"
              value={user?.last_name}
              onChange={e => setUser({ ...user, last_name: e.target.value })}
            />
            <CssTextField 
              required
              label="E-mail" 
              placeholder="Informe o seu novo email" 
              variant="outlined"
              value={user?.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <AlertCustom 
            type="success"
            message="Dados salvos com sucesso!"
            open={isSave}
            close={() => setIsSave(false)}
          />

          <AlertCustom 
            type="error"
            message="Houve um erro ao tentar atualizar. Tente mais tarde!"
            open={isError}
            close={() => setIsError(false)}
          />

          <Button 
            type="primary"
            text="Salvar"
            size={120}
            icon={<SaveAlt style={{ color: '#FFF', marginRight: 8 }} />}
            onClick={() => saveUser()} 
          />
        </div>
      </div>
    </>
  )
}

export { UserEdit }