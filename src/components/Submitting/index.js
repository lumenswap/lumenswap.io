import Loading from 'components/Loading';

const Submitting = ({ text, loadingSize }) => (
  <div className="d-flex align-items-center justify-content-center w-100 h-100">
    {text}
    <div className="ml-2">
      <Loading size={loadingSize} />
    </div>
  </div>
);

export default Submitting;
