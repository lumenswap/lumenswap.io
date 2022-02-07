import NoData from 'components/NoData';
import Loading from 'components/Loading';
import SingleProposalItem from './SingleProposalItem';
import styles from './styles.module.scss';

function DAOProposalItems({ proposals, governanceInfo }) {
  if (!proposals) {
    return <div className={styles.loading}><Loading size={48} /></div>;
  }
  if (proposals.length === 0) {
    return (
      <div className={styles['no-data-container']}>
        <NoData message="There is no proposals" />
      </div>
    );
  }
  return (
    proposals?.map((proposal) => (
      <div className="mt-4" key={proposal.id}>
        <SingleProposalItem item={proposal} pageName={governanceInfo.officialName} />
      </div>
    ))
  );
}

export default DAOProposalItems;
