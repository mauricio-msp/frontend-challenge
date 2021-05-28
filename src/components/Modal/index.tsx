import React, { ReactNode } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './styles.css';

type ModalCustomProps = {
  open: boolean;
  title: string;
  subTitle?: string;
  children?: ReactNode;
  closed: () => void;
};

function ModalCustom({ open, title, subTitle, children, closed }: ModalCustomProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closed}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
        <Fade in={open}>
          <div className="modalConfirm">
            <h2 id="transition-modal-title">{title}</h2>
            {subTitle && (
              <p id="transition-modal-description">
                {subTitle}
              </p>
            )}

            <div className="modalContent">
              {children}
            </div>
          </div>
        </Fade>
    </Modal>
  );
}

export { ModalCustom }