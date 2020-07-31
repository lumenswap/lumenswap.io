import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tooltip } from 'reactstrap';
import styles from './styles.module.scss';

const DetailTooltip = ({ info, id }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <button
        type="button"
        className={classNames('btn ml-1 p-0', styles.btn)}
        id={id}
      ><span className="icon-question-circle" />
      </button>
      <Tooltip placement="top" isOpen={tooltipOpen} target={id} toggle={toggle}>
        {info}
      </Tooltip>
    </>
  );
};

DetailTooltip.propTypes = {
  info: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DetailTooltip;
