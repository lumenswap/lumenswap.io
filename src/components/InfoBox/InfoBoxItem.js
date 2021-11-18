import Image from 'next/image';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import styles from './styles.module.scss';
import InfoBoxLink from './InfoBoxLink';
import QuestionIcon from '../../assets/images/question-icon.png';

function InfoBoxItem({ item, data }) {
  let url = false;
  if (item.externalLink || item.internalLink) {
    url = true;
  }

  return (
    <div className={styles.row}>
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
