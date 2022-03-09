import React from 'react';
import Steps, { Step } from 'rc-steps';
import styles from './styles.module.scss';

const CSteps = ({ currentStep, steps }) => (
  <>
    <div className={styles.step}>
      <Steps size="small" current={currentStep}>
        {steps.map((s, i) => (
          <Step key={i} />
        ))}
      </Steps>
    </div>

    <div className={styles.content}>
      {steps[currentStep].content}
    </div>
  </>
);

export default CSteps;
