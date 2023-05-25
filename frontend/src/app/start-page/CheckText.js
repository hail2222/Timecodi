import React from 'react'

function CheckText({text}) {
  return (
    <p style={{fontSize: 'large'}} className="mb-2">
      <i className="mdi mdi-check text-danger"/>{text}
    </p>
  );
}

export default CheckText