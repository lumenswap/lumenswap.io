import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './styles.module.scss';

export function PrimaryTooltip({ text }) {
  return <div className={styles['tooltip-message']}>{text}</div>;
}

const Tooltips = ({
  placement = 'top', id, text, children, customProps,
}) => (
  <OverlayTrigger
    {...customProps}
    key={placement}
    placement={placement}
    overlay={(<Tooltip id={'tooltip-'.concat(id)} className={styles.tooltip}>{text}</Tooltip>)}
  >
    {children}
  </OverlayTrigger>
);

export default Tooltips;
