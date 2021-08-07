import classNames from 'classnames';
import Image from 'next/image';
import styles from './styles.module.scss';
import questionLogo from './SVG-icons/question.svg';

const InfoOfLSP = ({
  walletBalance, holderReward, tradeReward,
}) => (

  <div className={classNames('row w-100', styles.main)}>
    <div className={classNames('col-lg-auto col-md-4 col-sm-12 col-12 px-0', styles['container-info'])}>
      <div className={styles['first-block']}>
        <div className={styles['title-info']}>Wallet balance
          <div
            className={styles.icons}
          ><Image
            height="14"
            width="14"
            src={questionLogo}
            alt="question"
          />
          </div>
        </div>
        <div className={styles['number-info']}>{walletBalance}
          <span className={styles['number-info-fist-span']}>LSP</span>
        </div>
      </div>
    </div>
    <div className={classNames('col-lg-auto col-md-4 col-sm-12 col-12 px-0', styles['container-info'])}>
      <div className={styles.block}>
        <div className={styles['title-info']}>Holder reward earned
          <div
            className={styles.icons}
          ><Image
            height="14"
            width="14"
            src={questionLogo}
            alt="question"
          />
          </div>
        </div>
        <div className={styles['number-info']}>{holderReward}
          <span>LSP</span>
        </div>

      </div>
    </div>
    <div className={classNames('col-lg-auto col-md-4 col-sm-12 col-12 px-0', styles['container-info'])}>
      <div className={styles.block}>
        <div className={styles['title-info']}>Trade reward earned
          <div
            className={styles.icons}
          ><Image
            height="14"
            width="14"
            src={questionLogo}
            alt="question"
          />
          </div>
        </div>
        <div className={styles['number-info']}>{tradeReward}
          <span>LSP</span>
        </div>
      </div>
    </div>

  </div>
);

export default InfoOfLSP;
