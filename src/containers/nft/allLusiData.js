import classNames from 'classnames';
import urlMaker from 'helpers/urlMaker';
import CardThumbnail from './CardThumbnail';
import styles from './styles.module.scss';

function AllLusiData({ allLusi }) {
  return (
    <div className={classNames('row', styles.row)}>
      {allLusi?.map((item) => (
        <div
          key={item.number}
          className={classNames('col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12 mt-4', styles.col)}
        >
          <CardThumbnail
            name={`Lusi-${item.number}`}
            imgSrc={item.imageUrl}
            price={item.price}
            url={urlMaker.nft.lusi(item.number)}
          />
        </div>
      ))}
    </div>
  );
}

export default AllLusiData;
