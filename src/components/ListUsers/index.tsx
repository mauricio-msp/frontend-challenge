import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';

import './styles.css';
import { useState } from 'react';
import { Button } from '../Button';
import { ModalCustom } from '../Modal';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    marginTop: 20
  },
  cellHead: {
    fontSize: 16,
    fontWeight: 700
  },
  cellBody: {
    fontSize: 16,
    fontWeight: 400
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

type Users = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

type ListUserProps = {
  users: Users[];
}

function ListUsers({ users }: ListUserProps) {
  const classes = useStyles();

  const [idStore, setIdStore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [newUsers, setNewUsers] = useState<Users[]>([]);

  function handleOpen(id: number) {
    setIdStore(id);
    setIsOpen(true);
  };

  function handleClose() {
    setIsOpen(false);
  };

  function removeUser(id: number) {
    const users = newUsers.filter((user) => user.id !== id);
    setNewUsers(users);
    setIsOpen(false);
  }

  useEffect(() => {
    setNewUsers(users);
  }, [users])

  return (
    <>
      <ModalCustom 
        open={isOpen} 
        closed={handleClose} 
        title="Remover usuário" 
        subTitle="Deseja realmente remover este usuário?"
      >
        <Button 
          type="primary"
          text="Deletar"
          size={120}
          icon={<Delete style={{ color: '#FFF', marginRight: 8 }} />}
          onClick={() => removeUser(idStore)} 
        />
        <Button 
          type="secondary"
          text="Cancelar"
          bordered
          size={130}
          icon={<Clear style={{ color: '#424242', marginRight: 8 }} />}
          onClick={() => handleClose()} 
        />
      </ModalCustom>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.cellHead} style={{ width: 450 }}>
              Nome do usuário
            </TableCell>
            <TableCell align="left" className={classes.cellHead} style={{ width: 500 }}>
              E-mail
            </TableCell>
            <TableCell align="left" className={classes.cellHead}>
              Açoes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="left" className={classes.cellBody}>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell align="left" className={classes.cellBody}>
                {user.email}
              </TableCell>
              <TableCell align="left" className={classes.cellBody}>
                <div className="groupButtons">
                  <Link 
                    to={`/users/${user.id}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <button 
                      className="buttonAction" 
                      disabled={user.id >= 100}
                    >
                      <Edit style={{ marginRight: 8 }} />
                      editar
                    </button>
                  </Link>
                  <button 
                    className="buttonAction" 
                    onClick={() => handleOpen(user.id)}
                    disabled={user.id >= 100}
                  >
                    <Delete style={{ color: '#F00', marginRight: 8 }} />
                    excluir
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { ListUsers }

