import classNames from 'classnames';
import styles from './styles.module.scss';

function CCard({ children, className, centerItems }) {
  return (
    <div
      style={centerItems && { display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      className={classNames(styles.card, className)}
    >
      {children}
    </div>
  );
}

export default CCard;
