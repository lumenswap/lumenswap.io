import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { ReactComponent as Rabet } from 'assets/images/rabet.svg';
import styles from './styles.module.scss';

const CustomDropdown = ({
  items, width, height, className,
}) => {
  const [show, setShow] = useState(false);
  const styleSheet = {
    div: {
      minWidth: `${width}`,
      width: `${width}`,
      marginTop: '1px',
    },
  };
  return (
    <div className={classNames(styles.dropdown, className)}>
      <Dropdown
        style={{ width: `${width}` }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Dropdown.Toggle
          id="dropdown-basic"
          style={{ height: `${height}`, width: `${width}` }}
          className={styles.hover}
        >
          <Rabet />G123d…8942
        </Dropdown.Toggle>
        <Dropdown.Menu style={styleSheet.div} show={show}>
          <Dropdown.Item eventKey={0}>
            <span className="icon-copy" />Copy address
          </Dropdown.Item>
          <Dropdown.Item eventKey={1}>
            <span className="icon-earth" />Open in lumenscan <span className="icon-external" />
          </Dropdown.Item>
          <Dropdown.Item eventKey={2}>
            <span className="icon-shutdown" style={{ fontSize: '13px' }} />Disconnect
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
