import classNames from 'classnames';
import urlMaker from 'helpers/urlMaker';
import CardThumbnail from './CardThumbnail';
import styles from './styles.module.scss';

function AllLuciData({ allLusi }) {
  return (
    <div className={classNames('row', styles.row)}>
      {allLusi?.map((item) => (
        <div
          key={item.id}
          className={classNames('col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12 mt-4', styles.col)}
        >
          <CardThumbnail
            name={item.name}
            imgSrc={item.img}
            price={item.price}
            url={urlMaker.nft.lusi(item.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default AllLuciData;
