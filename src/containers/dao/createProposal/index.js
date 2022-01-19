import classNames from 'classnames';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';
import Button from 'components/Button';
import Options from './Options';

import styles from './styles.module.scss';

const Datepicker = dynamic(() => import('components/Datepicker'), {
  ssr: false,
});

const CreateProposal = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());
  const [result, setResult] = useState('');
  const {
    handleSubmit,
    control,
  } = useForm({
    mode: 'onChange',
  });

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Create Proposal | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: router.query.name },
    { name: 'Create proposal' },
  ];

  const onSubmit = (data) => {
    console.log(data);
    setResult(data);
  };

  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />

              <div className={styles.card}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="question"
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <div className="d-flex align-items-center mb-4">
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Ask a question…"
                          value={props.value}
                          onChange={props.onChange}
                          maxLength={30}
                        />
                        {props.value
                          && (
                          <div className={styles.length}>
                            <span>{props.value.length}</span>/30
                          </div>
                          )}
                      </div>
                    )}
                  />
                  <Controller
                    name="proposal"
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <div className="d-flex flex-column mb-4">
                        <textarea
                          className={styles.textarea}
                          placeholder="Tell more about your proposal (optional)"
                          value={props.value}
                          onChange={props.onChange}
                          maxLength={300}
                        />
                        {props.value
                          && (
                          <div className={classNames(styles.length, 'text-right mt-2')}>
                            <span>{props.value.length}</span>/300
                          </div>
                          )}
                      </div>
                    )}
                  />
                  <Options control={control} Controller={Controller} />

                  <div className="d-flex mt-4">
                    <div className="flex flex-column">
                      <label className="label-primary">Start date</label>
                      <Datepicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>

                  <Button
                    htmlType="submit"
                    variant="primary"
                    className={styles.submit}
                  >Create proposal
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default CreateProposal;
