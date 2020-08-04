import React, { useState } from 'react';
import Clipboard from 'react-clipboard.js';
import { Popover } from 'reactstrap';
import styles from './styles.module.scss';

const CopyInfo = ({ id, text, children }) => {
  const [popoverOpen, handlePopover] = useState(false);

  const toggle = () => {
    handlePopover(true);
    setTimeout(() => {
      handlePopover(false);
    }, 700);
  };

  return (
    <>
      <div id={id}>
        <Clipboard className="btn p-0" style={{ borderRadius: '0' }} data-clipboard-text={text}>
          {children}
        </Clipboard>
      </div>
      <Popover
        placement="top"
        isOpen={popoverOpen}
        target={id}
        toggle={toggle}
        className={styles.popover}
      >Copied!
      </Popover>
    </>
  );
};

export default CopyInfo;
