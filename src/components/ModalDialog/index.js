import classNames from 'classnames';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const ModalDialog = ({
  children, title, show, setShow, width = 360, back, backAction,
}) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <div className={styles.header}>
        {back ? <span className="icon-arrow-left" style={{ cursor: 'pointer' }} onClick={backAction} />
          : (
            <h2 className={styles.title}>{title}</h2>
          )}
        <button
          type="button"
          className={classNames('icon-multiply', styles.close)}
          onClick={handleClose}
        />
      </div>
      <div style={{ width: `${width}px` }}>
        <Modal.Body>
          {children}
        </Modal.Body>
      </div>
    </Modal>
  );
};

ModalDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default ModalDialog;
