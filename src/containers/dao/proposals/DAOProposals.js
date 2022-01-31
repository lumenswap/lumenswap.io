import NoData from 'components/NoData';
import Loading from 'components/loading';
import ProposalItem from './ProposalItem';
import styles from './styles.module.scss';

function DAOProposals({ proposals, info }) {
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
    <>{proposals?.map((proposal) => (
      <div className="mt-4" key={proposal.id}>
        <ProposalItem item={proposal} pageName={info.officialName} />
      </div>
    ))}
    </>
  );
}

export default DAOProposals;
