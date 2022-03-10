import copyText from 'helpers/copyText';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import CopyIcon from 'assets/images/copy';
import classNames from 'classnames';
import { useState } from 'react';
import styles from '../../styles.module.scss';

function CustomCopyText({ content, className }) {
  const [tooltipShow, setTooltipShow] = useState(false);
  const handleShowTooltip = () => {
    setTooltipShow(true);
    setTimeout(() => setTooltipShow(false), 2000);
  };
  return (
    <Tooltips
      id="copy"
      text={<PrimaryTooltip text="Copied!" />}
      customProps={{
        show: tooltipShow,
      }}
    >
      <span
        className={classNames(styles.icon, className)}
        onClick={() => {
          copyText(content);
          handleShowTooltip();
        }}
      >
        <CopyIcon />
      </span>
    </Tooltips>
  );
}

export default CustomCopyText;
