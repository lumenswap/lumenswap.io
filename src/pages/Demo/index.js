import { useState } from 'react';
import ModalDialog from 'components/ModalDialog';
import WaitingContent from 'blocks/WaitingContent';

const Demo = () => {
  const [waitingShow, setWaitingShow] = useState(false);
  return (
    <div className="container-fluid my-5 py-5">
      {/* waiting */}
      <button type="button" className="btn btn-dark" onClick={() => setWaitingShow(true)}>waiting</button>
      <ModalDialog show={waitingShow} setShow={setWaitingShow}>
        <WaitingContent message="Waiting for sign transaction" />
      </ModalDialog>
    </div>
  );
};

export default Demo;
