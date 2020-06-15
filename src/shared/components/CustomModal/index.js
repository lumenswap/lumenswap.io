import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'reactstrap';
import styles from './styles.less';

const CustomModal = ({
  modal, toggle, modalSize, title, children,
}) => (
  <Modal
    isOpen={modal}
    toggle={() => toggle()}
    size="lg"
    style={{ width: `${modalSize}px` }}
    className={classNames(styles.modal)}
  >
    <div className={classNames('row justify-content-between h-100 d-flex align-items-center', styles.header)}>
      <div className="col-auto">
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className="col-auto">
        <button type="button" className={classNames('btn', styles.remove)} onClick={() => toggle()}>
          <span className="icon-multiplied" />
        </button>
      </div>
    </div>
    <hr className={styles.hr} />
    <div className="row">
      <div className="col-12">
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  </Modal>
);

CustomModal.propTypes = {

};

export default CustomModal;
