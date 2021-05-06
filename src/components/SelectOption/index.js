import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import styles from './styles.module.scss';

const SelectOption = ({
  items, height, width, fontSize, className, searchable, setValue,
}) => {
  const [selected, setSelected] = useState(items[0]);

  const styleSheet = {
    div: {
      minWidth: `${width}`,
    },
  };

  const onChangeNetwork = (e) => {
    setSelected(e);
    setValue(e);
  };

  return (
    <div>
      {searchable ? (
        <div className={styles.select}>
          <Select
            classNamePrefix="search"
            separator={false}
            closeMenuOnSelect
            defaultValue={items[0]}
            options={items}
            hideSelectedOptions={false}
            isSearchable
            backspaceRemovesValue={false}
            onChange={(e) => onChangeNetwork(e)}
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
      ) : (
        <div className={classNames(styles.dropdown, className)}>
          <Dropdown style={{ width: `${width}` }}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ height: `${height}`, width: `${width}`, fontSize: `${fontSize}px` }}
            >
              {selected.label}
            </Dropdown.Toggle>
            <Dropdown.Menu style={styleSheet.div}>
              {items.map((item) => (
                <Fragment key={item.value}>
                  <Dropdown.Item
                    eventKey={item.value}
                    onClick={() => {
                      setSelected(item);
                    }}
                  >
                    {item.label}
                  </Dropdown.Item>
                </Fragment>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

SelectOption.defaultProps = {
  fontSize: 16,
  width: '100%',
  height: 'auto',
  className: '',
  searchable: false,
  setValue: () => {},
};

SelectOption.propTypes = {
  items: PropTypes.array.isRequired,
  fontSize: PropTypes.number,
  height: PropTypes.any,
  width: PropTypes.any,
  className: PropTypes.string,
  searchable: PropTypes.bool,
  setValue: PropTypes.func,
};

export default SelectOption;
