import classNames from 'classnames';
import SecondStyles from 'components/Button/styles.module.scss';
import jsxThemeColors from 'helpers/jsxThemeColors';
import Slider from 'rc-slider';
import styles from './styles.module.scss';

function WithdrawLiquiditySliderInput({ value, onChange, defaultValue }) {
  const handle25Percent = () => {
    onChange(25);
  };
  const handle50Percent = () => {
    onChange(50);
  };
  const handle75Percent = () => {
    onChange(75);
  };
  const handleMaxPercent = () => {
    onChange(100);
  };
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <div className={styles.header}>
          Amount
        </div>
        <div className={styles.info}>
          <span className={styles['current-value']}>{value}%</span>
          <div className={styles.btns}>
            <div
              onClick={handle25Percent}
              className={value === 25 ? classNames(styles['btn-active'], SecondStyles['button-primary']) : classNames(styles.btn, SecondStyles['button-secondary'])}
            >25%
            </div>
            <div
              onClick={handle50Percent}
              className={value === 50 ? classNames(styles['btn-active'], SecondStyles['button-primary']) : classNames(styles.btn, SecondStyles['button-secondary'])}
            >50%
            </div>
            <div
              onClick={handle75Percent}
              className={value === 75 ? classNames(styles['btn-active'], SecondStyles['button-primary']) : classNames(styles.btn, SecondStyles['button-secondary'])}
            >75%
            </div>
            <div
              onClick={handleMaxPercent}
              className={value === 100 ? classNames(styles['btn-active'], SecondStyles['button-primary']) : classNames(styles.btn, SecondStyles['button-secondary'])}
            >Max
            </div>
          </div>
        </div>
        <Slider
          onChange={onChange}
          defaultValue={defaultValue}
          min={1}
          max={100}
          railStyle={{ height: 2, backgroundColor: jsxThemeColors.zumthor }}
          trackStyle={{ backgroundColor: jsxThemeColors.blueRibbon, height: 2 }}
          handleStyle={{
            height: 24,
            width: 24,
            marginTop: -12,
            backgroundColor: jsxThemeColors.blueRibbon,
            border: 0,
          }}
          value={value}
          type="range"
          className={styles.input}
        />
      </div>
    </div>
  );
}

export default WithdrawLiquiditySliderInput;
