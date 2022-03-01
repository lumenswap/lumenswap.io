import React, { useState } from 'react';

import NextStep from 'components/NextStep';
import SuccessStep from 'containers/bridge/Convert/SuccessStep';
import Step1 from './Step1';
import Step2 from './Step2';

import styles from '../step.module.scss';

const BridgeTwo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    { content: <Step1 nextStep={nextStep} /> },
    { content: <Step2 nextStep={nextStep} /> },
    { content: <SuccessStep nextStep={nextStep} /> },
  ];
  return (
    <div className={styles.container}>
      <NextStep currentStep={currentStep} steps={steps} />
    </div>
  );
};

export default BridgeTwo;
