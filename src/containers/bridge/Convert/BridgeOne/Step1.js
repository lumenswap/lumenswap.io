import React from 'react';

const Step1 = ({ nextStep }) => (
  <div>
    Please send the specified amount to the specified address.
    <button type="button" onClick={nextStep}>next</button>
  </div>
);

export default Step1;
