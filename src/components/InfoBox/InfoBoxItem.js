import Image from 'next/image';

import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import classNames from 'classnames';
import QuestionIcon from 'assets/images/question-icon.png';
import InfoBoxLink from './InfoBoxLink';

import styles from './styles.module.scss';

function InfoBoxItem({
  item, data, bordered, sidePadding,
}) {
  let url = false;
  if (item.externalLink || item.internalLink) {
    url = true;
  }

  return (
    <div
      className={(classNames(styles.row, bordered && styles.bordered, 'row-info'))}
      style={{ padding: `${sidePadding}px` }}
    >
      <div className={styles.title}>
        <span className={styles['align-center']}>
          {item.title}
          {item.tooltip && (
          <Tooltips placement="top" id="price" text={<PrimaryTooltip text={item.tooltip} />}>
            <span style={{ marginLeft: 2, height: 18 }}>
              <Image src={QuestionIcon} width={16} height={16} />
            </span>
          </Tooltips>
          )}
        </span>
      </div>
      <div className={styles['align-center']}>{url ? <InfoBoxLink item={item} /> : item.render(data)}</div>
    </div>

  );
}

export default InfoBoxItem;
