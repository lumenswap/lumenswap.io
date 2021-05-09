import Slider, { SliderTooltip } from 'rc-slider';
import styles from './styles.module.scss';

const CustomSlider = ({ title }) => {
  const marks = {
    0: '',
    25: '',
    50: '',
    75: '',
    100: '',
  };

  const log = (value) => {
      console.log(value); //eslint-disable-line
  };

  const { Handle } = Slider;
  const handle = (props) => {
    const {
      value, dragging, index, ...restProps
    } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
  return (
    <div className={styles.slider}>
      <p className="mb-0">{title}</p>
      <Slider
        min={0}
        max={100}
        marks={marks}
        step={1}
        onAfterChange={log}
        tipFormatter={(value) => `${value}%`}
        handle={handle}
      />
    </div>
  );
};

export default CustomSlider;
