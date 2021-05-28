import React from 'react';

import Alert from '@material-ui/lab/Alert';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

type AlertCustomProps = {
  type: 'success' | 'warning' | 'error' | 'info';
  open: boolean;
  message: string;
  close: () => void;
}

function AlertCustom({ type, open, message, close }: AlertCustomProps) {
  return (
    <Collapse in={open}>
      <Alert 
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              close()
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
}

export { AlertCustom }