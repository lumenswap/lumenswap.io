import classNames from 'classnames';
import Image from 'next/image';
import QuestionIcon from 'assets/images/question-icon.png';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import styles from './style.module.scss';

const ShowTolerance = ({ value }) => (
  <div className="d-flex justify-content-between mt-3">
    <span
      className={classNames(styles.tolerance, 'd-flex align-items-center')}
    >
      Tolerance
      <Tooltips
        placement="top"
        id="price"
        text={<PrimaryTooltip text="Your transaction will revert if the price changes unfavaorably by more than this percentage." />}
      >
        <span style={{ marginLeft: 2, height: 18 }}>
          <Image src={QuestionIcon} width={16} height={16} />
        </span>
      </Tooltips>
    </span>

    <div>
      <span style={{ fontSize: 14 }}>
        {value}%
      </span>
    </div>
  </div>
);

export default ShowTolerance;
