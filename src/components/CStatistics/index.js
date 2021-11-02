import Image from 'next/image';
import classNames from 'classnames';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import questionIcon from 'assets/images/question.svg';

import styles from './styles.module.scss';

export const Info = ({ number, text, className }) => (
  <div className={classNames(styles['number-info'], className)}>{number ?? '-'}
    <span>{text}</span>
  </div>
);

const CStatistics = ({ blocks, className }) => (
  <div className={classNames('row w-100', styles.main, className)}>{blocks.map((block) => (
    <div
      className={classNames('col-lg-4 col-md-6 col-sm-12 col-12 px-0',
        styles.container)}
      key={block.title}
    >
      <div
        className={styles.block}
      >
        <div className={styles['title-info']}>{block.title}
          {block.tooltip && (
          <Tooltips id="statistics" text={<PrimaryTooltip text={block.tooltip} />}>
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
          )}
        </div>
        {block.content}
        {block.subtitle ? block.subtitle : <></>}
      </div>
    </div>
  ))}
  </div>
);

export default CStatistics;
