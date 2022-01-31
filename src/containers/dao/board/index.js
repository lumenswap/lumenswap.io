import classNames from 'classnames';
import ServerSideLoading from 'components/ServerSideLoading';
import DAOContainer from '../DAOContainer';
import GovernanceSummary from './GovernanceSummary/GovernantSummary';
import styles from './styles.module.scss';

const DaoBoard = ({ boards }) => (
  <DAOContainer title="Board | Lumenswap">
    <ServerSideLoading>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>Board</h1>
            <div className="row mt-4">
              {boards.map((item) => (
                <div key={item.name} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                  <GovernanceSummary item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ServerSideLoading>
  </DAOContainer>
);

export default DaoBoard;
