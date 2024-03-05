import React from 'react';

const ButtonUpdate = ({ onClick, text}) => {
  return (
    <a style={{ cursor: "pointer", color:"rgb(11, 7, 244))", margin:"10px" }} onClick={onClick()}>{text}</a>
  );
};

export default ButtonUpdate;
