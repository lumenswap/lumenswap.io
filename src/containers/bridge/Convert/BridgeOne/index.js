import React, { useState } from 'react';

import NextStep from 'components/NextStep';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import styles from './styles.module.scss';

const BridgeOne = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    { content: <Step1 nextStep={nextStep} /> },
    { content: <Step2 nextStep={nextStep} /> },
    { content: <Step3 nextStep={nextStep} /> },
  ];
  return (
    <div className={styles.container}>
      <NextStep currentStep={currentStep} steps={steps} />
    </div>
  );
};

export default BridgeOne;
