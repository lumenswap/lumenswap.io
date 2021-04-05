import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './styles.module.scss';

const Tooltips = ({
  placement = 'top', id, text, children,
}) => (
  <OverlayTrigger
    key={placement}
    placement={placement}
    overlay={(<Tooltip id={'tooltip-'.concat(id)} className={styles.tooltip}>{text}</Tooltip>)}
  >
    {children}
  </OverlayTrigger>
);

export default Tooltips;
