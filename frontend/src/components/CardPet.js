import React from 'react';

function CardOption({ icon, title }) {
  return (
    <div className="card">
      {/* <img src={require(`../assets/icons/${icon}`)} alt={title} /> */}
      <h3>{title}</h3>
    </div>
  );
}

export default CardOption;
