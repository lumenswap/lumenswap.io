import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import BoardItem from 'containers/dao/BoardItem';
import ProposalItem from 'containers/dao/proposals/ProposalItem';
import urlMaker from 'helpers/urlMaker';
import Breadcrumb from 'components/BreadCrumb';
import Button from 'components/Button';
import SelectOption from 'components/SelectOption';

import { getProposals } from 'api/mockAPI/proposals';
import Loading from 'components/Loading';
import useIsLogged from 'hooks/useIsLogged';
import styles from './styles.module.scss';

const dropdownItems = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'not-started', label: 'Not Started' },
  { value: 'ended', label: 'Ended' },
];

const Container = ({ children, info }) => (
  <div className="container-fluid">
    <Head>
      <title>proposals | Lumenswap</title>
    </Head>
    <DAOHeader asset={info.asset} />
    {children}
  </div>
);

const Proposals = ({ info }) => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const [proposals, setProposals] = useState(null);
  const isLogged = useIsLogged();
  const router = useRouter();

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { name: info.name },
  ];

  useEffect(() => {
    setProposals(null);
    getProposals(info.name, { status: select.value }).then((data) => {
      setProposals(data);
    });
  }, [select]);

  return (
    <Container info={info}>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />

              <div className="mt-4">
                <BoardItem item={info} size="lg" />
              </div>

              <div className={styles['container-proposals']}>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h2 className={styles.title}>Proposals</h2>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex align-items-center">
                      <SelectOption
                        items={dropdownItems}
                        defaultValue={select}
                        setValue={setSelect}
                        className={styles.filter}
                        isSearchable={false}
                      />
                      {isLogged && (
                      <Button
                        variant="primary"
                        content="Create proposal"
                        className={styles.btn}
                        onClick={() => {
                          router.push(urlMaker.dao.singleDao.createProposal(router.query.name));
                        }}
                      />
                      )}
                    </div>
                  </div>
                </div>

                {proposals ? proposals?.map((proposal) => (
                  <div className="mt-4" key={proposal.id}>
                    <ProposalItem item={proposal} pageName={info.officialName} />
                  </div>
                )) : <div className={styles.loading}><Loading size={48} /></div>}
              </div>

            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default Proposals;
