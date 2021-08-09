import React, { useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';

import Header from 'components/Header';
import DetailedInfo from 'components/DetailedInfo';
import Table from 'components/Table';
import sampleLogo from 'assets/images/btc-logo.png';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import ModalDialog from 'components/ModalDialog';
import SendAsset from 'blocks/SendAsset';

import styles from './styles.module.scss';

const wallet = () => {
  const [show, setShow] = useState(false);
  const { control, register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const details = [
    { title: 'Total balance', xlm: '55,45', value: '45,5' },
    { title: 'Reserved balance', xlm: '12,4', value: '13,4' },
  ];

  const tableHeader = ['Assets', 'Balance', 'Action'];

  const tableRows = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row, index) => (
    <tr key={index}>
      <td>
        <div className="d-flex align-items-center">
          <img src={sampleLogo} width={32} height={32} alt="logo" />
          <span className={styles['td-name']}>
            <span>DAI</span>
            <span>Dinora</span>
          </span>
        </div>
      </td>
      <td>70.733</td>
      <td>
        <div className="d-flex">
          <a href="/" className="mr-5">Swap</a>
          <a href="/" className="mr-5">Trade</a>
          <span className="color-primary cursor-pointer" onClick={() => setShow(true)}>Send</span>
        </div>
      </td>
    </tr>
  ));

  function onSubmit(data) { console.warn(data); }

  return (
    <div>
      <Head>
        <title>Lumenswap | wallet</title>
      </Head>
      <div className="container-fluid main">
        <Header />
        <div className={classNames('layout-inside', styles.layout)}>
          <h1 className="title my-0">Wallet</h1>
          <div className={classNames(styles.card, styles['card-detail'])}>
            <DetailedInfo details={details} />
          </div>
          <div className={classNames(styles.card, styles['card-table'])}>
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="row justify-content-between align-items-center flex-nowrap">
                <div className="col-auto">
                  <div className={styles.input}>
                    <Input
                      type="text"
                      name="asset"
                      id="asset"
                      innerRef={register}
                      placeholder="Search assets"
                      height={40}
                      fontSize={15}
                    />
                  </div>
                </div>
                <div className="col-auto pl-0">
                  <div className={styles.checkbox}>
                    <Controller
                      name="checkbox"
                      control={control}
                      defaultValue={false}
                      render={(props) => (
                        <Checkbox
                          value={props.value}
                          onChange={props.onChange}
                          size={20}
                          fontSize={14}
                          label="Hide other pairs"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="mt-4">
              <Table className={styles.table} tableRows={tableRows()} tableHead={tableHeader} />
            </div>
          </div>
        </div>
      </div>
      <ModalDialog show={show} setShow={setShow} title="Send">
        <SendAsset />
      </ModalDialog>
    </div>
  );
};

export default wallet;
