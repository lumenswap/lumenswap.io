import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import styles from './styles.module.scss';
import QuestionIcon from '../../assets/images/question-icon.png';

function InfoBoxItem({ item, data }) {
  let RowLink = null;
  if (item.externalLink) {
    RowLink = () => (
      <a
        className={classNames(styles['ticket-id'], styles.infos)}
        style={{ textDecoration: 'none' }}
        href={item.externalLink.url}
        target="_blank"
        rel="noreferrer"
      >{item.externalLink.title}
      </a>
    );
  }
  if (item.internalLink) {
    RowLink = () => (
      <Link href={item.internalLink.url}>
        <a className={classNames(styles['ticket-id'], styles.infos)}>
          {item.internalLink.title}
        </a>
      </Link>
    );
  }

  return (

    <div className={styles.row}>
      <div className={styles.title}>
        <span>
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
      <div>{RowLink ? <RowLink /> : item.render(data)}</div>
    </div>

  );
}

export default InfoBoxItem;
