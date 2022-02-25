import React from 'react';

const Step2 = ({ nextStep }) => (
  <div>
    We are sending 2 LBTC to your address. Please be patient.
    <button onClick={nextStep}>next</button>
  </div>
);

export default Step2;
