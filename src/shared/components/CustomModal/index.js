import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'reactstrap';
import isEmpty from 'src/helpers/is-empty';
import arrowLeft from 'src/assets/images/arrow-left.png';
import { connectModalTab } from 'src/constants/enum';
import styles from './styles.less';

const CustomModal = ({
  modal, toggle, modalSize, title, children, setTab, tab, isConnect,
}) => {
  const isNeedTitle = (tab === connectModalTab.CONNECT);

  return (
    <Modal
      isOpen={modal}
      toggle={() => toggle()}
      size="lg"
      style={{ width: `${modalSize}px` }}
      className={classNames(styles.modal)}
    >
      {isConnect ? (
      // connect type
        <>
          <div className={classNames('row h-100 d-flex align-items-center justify-content-between', styles.header)}>
            <div className="col-auto">
              {isNeedTitle ? <h2 className={styles.title}>{title}</h2>
                : (
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => setTab(connectModalTab.CONNECT)}
                  >
                    <img
                      src={arrowLeft}
                      alt="arrow"
                      width="18px"
                      height="14px"
                    />
                  </button>
                )}
            </div>
            <div className="col-auto">
              <button type="button" className={classNames('btn', styles.remove)} onClick={() => toggle()}>
                <span className="icon-multiplied" />
              </button>
            </div>
          </div>
          {isNeedTitle && <hr className={styles.hr} />}
          <div className="row">
            <div className="col-12">
              <div className={styles.content}>
                {children}
              </div>
            </div>
          </div>
        </>
      ) : (
      // basic type
        <>
          <div className={classNames('row h-100 d-flex align-items-center',
            styles.header, !isEmpty(title) ? 'justify-content-between' : 'justify-content-end')}
          >
            {(!isEmpty(title)) && (
            <div className="col-auto">
              <h2 className={styles.title}>{title}</h2>
            </div>
            )}
            <div className="col-auto">
              <button type="button" className={classNames('btn', styles.remove)} onClick={() => toggle()}>
                <span className="icon-multiplied" />
              </button>
            </div>
          </div>
          {!isEmpty(title) && <hr className={styles.hr} />}
          <div className="row">
            <div className="col-12">
              <div className={styles.content}>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

CustomModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  modalSize: PropTypes.any.isRequired,
  title: PropTypes.string,
  tab: PropTypes.string,
  setTab: PropTypes.func,
  isConnect: PropTypes.bool,
};

export default CustomModal;
