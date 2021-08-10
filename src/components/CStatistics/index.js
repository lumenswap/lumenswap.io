import Image from 'next/image';
import classNames from 'classnames';
import Tooltips from 'components/Tooltip';
import styles from './styles.module.scss';
import questionIcon from '../../assets/images/question.svg';

export const Info = ({ number, text }) => (
  <div className={styles['number-info']}>{number}
    <span>{text}</span>
  </div>
);

const CStatistics = ({ blocks }) => (
  <div className={classNames('row w-100', styles.main)}>{blocks.map((block) => (
    <div
      style={{ width: `${block.width}` }}
      className={classNames('col-lg-auto col-md-4 col-sm-12 col-12 px-0',
        styles.container)}
    >
      <div
        style={{ marginLeft: `${block.contentMarginLeft}` }}
        className={styles.block}
      >
        <div className={styles['title-info']}>{block.title}
          <Tooltips id="statistics" text={block.tooltip}>
            <div
              className={styles.icons}
            >
              <Image
                height="14"
                width="14"
                src={questionIcon}
                alt="icon"
              />
            </div>
          </Tooltips>
        </div>
        {block.content}
      </div>
    </div>
  ))}
  </div>
);

export default CStatistics;
