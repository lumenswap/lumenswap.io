import classNames from 'classnames';
import DAOContainer from '../DAOContainer';
import GovernanceSummary from './GovernanceSummary/GovernantSummary';
import styles from './styles.module.scss';

const DaoBoard = ({ governances }) => (
  <DAOContainer title="Board | Lumenswap">
    <div className={classNames('layout main', styles.layout)}>
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
          <h1 className={styles.title}>Board</h1>
          <div className="row mt-4">
            {governances.map((item) => (
              <div key={item.name} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                <GovernanceSummary item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </DAOContainer>
);

export default DaoBoard;
