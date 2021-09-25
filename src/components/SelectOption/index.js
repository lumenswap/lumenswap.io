import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import styles from './styles.module.scss';

const SelectOption = ({
  items, height, width, setValue, className,
}) => {
  const [selected, setSelected] = useState(items[0]);

  const onChangeNetwork = (e) => {
    setSelected(e);
    setValue(e);
    console.warn(selected);
  };

  return (
    <div className={styles.select}>
      <Select
        classNamePrefix="select"
        separator={false}
        closeMenuOnSelect
        defaultValue={selected}
        options={items}
        hideSelectedOptions={false}
        isSearchable
        backspaceRemovesValue={false}
        onChange={(e) => onChangeNetwork(e)}
        className={className}
        styles={{
          ...styles,
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? 'black' : 'black',
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': { borderColor: 'black' },
            width,
            height,
            minHeight: height,
          }),
        }}
      />
    </div>
  );
};

SelectOption.defaultProps = {
  width: '100%',
  height: 'auto',
  setValue: () => {},
  className: '',
};

SelectOption.propTypes = {
  items: PropTypes.array.isRequired,
  height: PropTypes.any,
  width: PropTypes.any,
  setValue: PropTypes.func,
  className: PropTypes.string,
};

export default SelectOption;
