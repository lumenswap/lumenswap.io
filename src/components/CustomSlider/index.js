import Slider, { SliderTooltip } from 'rc-slider';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const CustomSlider = ({ title, onChange, upperValue }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(upperValue);
  }, [upperValue]);

  const marks = {
    0: '',
    25: '',
    50: '',
    75: '',
    100: '',
  };

  const { Handle } = Slider;
  const handle = (props) => {
    const {
      value: innerval, dragging, index, ...restProps
    } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${innerval} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={innerval} {...restProps} />
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
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
        tipFormatter={(val) => `${val}%`}
        handle={handle}
        value={value}
      />
    </div>
  );
};

export default CustomSlider;
