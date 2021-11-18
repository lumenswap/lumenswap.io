import PropTypes from 'prop-types';
import Select from 'react-select';

import styles from './styles.module.scss';

const SelectOption = ({
  items, height, width, setValue, defaultValue, className, isSearchable,
}) => {
  const onChangeNetwork = (e) => { setValue(e); };

  return (
    <div className={styles.select}>
      <Select
        classNamePrefix="select"
        separator={false}
        closeMenuOnSelect
        defaultValue={defaultValue}
        options={items}
        hideSelectedOptions={false}
        isSearchable={isSearchable}
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
  isSearchable: true,
};

SelectOption.propTypes = {
  items: PropTypes.array.isRequired,
  height: PropTypes.any,
  width: PropTypes.any,
  setValue: PropTypes.func,
  className: PropTypes.string,
  isSearchable: PropTypes.bool,
};

export default SelectOption;
