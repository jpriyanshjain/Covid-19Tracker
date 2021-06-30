import React from 'react';

import './BackDrop.css';

const backdrop = ({ clicked}) => (
  <div className="backDrop" onClick={clicked}></div> : null
);

export default backdrop;