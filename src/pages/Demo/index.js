import { useState } from 'react';
import ModalDialog from 'components/ModalDialog';
import WaitingContent from 'blocks/WaitingContent';
import TransactionResponse from 'blocks/TransactionResponse';
import AddAsset from 'blocks/AddAsset';
import EnterKey from 'blocks/EnterKey';
import ConnectWallet from 'blocks/ConnectWallet';

const Demo = () => {
  const [waitingShow, setWaitingShow] = useState(false);
  const [sresponseShow, setsResponseShow] = useState(false);
  const [fresponseShow, setfResponseShow] = useState(false);
  const [addAsset, setAddAsset] = useState(false);
  const [key, setKey] = useState(false);
  const [wallet, setWallet] = useState(false);
  return (
    <div className="container-fluid my-5 py-5">
      {/* waiting */}
      <button type="button" className="btn btn-dark" onClick={() => setWaitingShow(true)}>waiting</button>
      <ModalDialog show={waitingShow} setShow={setWaitingShow}>
        <WaitingContent message="Waiting for sign transaction" />
      </ModalDialog>
      {/* response */}
      <button type="button" className="btn btn-dark ml-3" onClick={() => setsResponseShow(true)}>success response</button>
      <ModalDialog show={sresponseShow} setShow={setsResponseShow}>
        <TransactionResponse status="success" message="0x401b914336b87673822c1792786bf0ccf1793795c594c42f174078ff425697f8" />
      </ModalDialog>
      {/*----*/}
      <button type="button" className="btn btn-dark ml-3" onClick={() => setfResponseShow(true)}>fail response</button>
      <ModalDialog show={fresponseShow} setShow={setfResponseShow}>
        <TransactionResponse status="Failed" message="There is some issue in your transaction" />
      </ModalDialog>
      {/* add asset */}
      <button type="button" className="btn btn-dark ml-3" onClick={() => setAddAsset(true)}>add asset</button>
      <ModalDialog title="Add asset" show={addAsset} setShow={setAddAsset} width={328}>
        <AddAsset toggleModal={() => setAddAsset(false)} />
      </ModalDialog>
      {/* key */}
      <button type="button" className="btn btn-dark ml-3" onClick={() => setKey(true)}>public or private key</button>
      <ModalDialog show={key} setShow={setKey} back>
        <EnterKey type="public" />
      </ModalDialog>
      {/* connect wallet */}
      <button type="button" className="btn btn-dark ml-3" onClick={() => setWallet(true)}>connect wallet</button>
      <ModalDialog show={wallet} setShow={setWallet} title="Connect to wallet">
        <ConnectWallet />
      </ModalDialog>
    </div>
  );
};

export default Demo;
