import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.less';
import DetailTooltip from '../DetailTooltip';

const InfoItem = ({
  item: {
    subject, value, tooltipId, tooltipInfo,
  },
}) => (
  <div className="row justify-content-between h-100 align-items-center" style={{ marginBottom: '7px' }}>
    <div className={classNames('col-auto', styles.subject)}>
      {subject}
      <DetailTooltip id={tooltipId} info={tooltipInfo} />
    </div>
    <div className={classNames('col-auto', styles.value)}>{value}</div>
  </div>
);

InfoItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default InfoItem;
