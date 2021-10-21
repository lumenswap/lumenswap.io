import Arrow from 'assets/images/arrowRight';
import classNames from 'classnames';
import styles from './styles.module.scss';

function BreadCrump({ data, className }) {
  return (
    <h1 className={classNames(styles.main, className)}>{data.item1}
      <Arrow /> {data.item2}
    </h1>
  );
}

export default BreadCrump;
