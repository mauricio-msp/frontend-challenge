import React, { ReactNode } from 'react';

import './styles.css';

type ButtonProps = {
  type: string;
  icon: ReactNode;
  text: string;
  size: number;
  bordered?: boolean;
  onClick?: () => void;
}

function Button({ type, icon, text, size, bordered, onClick }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${type}`} 
      onClick={onClick} 
      style={{ width: size, border: bordered ? '1px solid #424242' : '' }}
    >
      {icon}
      
      {text}
    </button>
  );
}

export { Button }