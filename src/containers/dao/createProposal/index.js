import classNames from 'classnames';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';

import styles from './styles.module.scss';

const CreateProposal = () => {
  const router = useRouter();
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
                    render={(props) => (
                      <div>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Ask a question…"
                          value={props.value}
                          onChange={props.onChange}
                        />
                        {/* {props.value && props.value.length} */}
                      </div>
                    )}
                  />
                  <Controller
                    name="proposal"
                    control={control}
                    render={(props) => (
                      <textarea
                        className={styles.textarea}
                        placeholder="Tell more about your proposal (optional)"
                        value={props.value}
                        onChange={props.onChange}
                      />
                    )}
                  />
                  {/* <button type="submit">test</button> */}
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
