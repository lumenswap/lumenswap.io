import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import QuestionIcon from 'assets/images/question-icon.png';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import styles from './styles.module.scss';

const InfoBox = ({
  title, rows, data, className,
}) => (
  <div className={classNames(styles.main, className)}>
    <div className={styles.rows}>
      <div className={styles['header-title']}>{title}</div>
      {rows.map((row) => (
        <div className={styles.row}>
          <div className={styles.title}>
            <span>
              {row.title}
              {row.tooltip && (
              <Tooltips placement="top" id="price" text={<PrimaryTooltip text={row.tooltip} />}>
                <span style={{ marginLeft: 2, height: 18 }}>
                  <Image src={QuestionIcon} width={16} height={16} />
                </span>
              </Tooltips>
              )}
            </span>
          </div>
          <div>{row.render(data)}</div>
        </div>
      ))}
    </div>
  </div>
);

export default InfoBox;
