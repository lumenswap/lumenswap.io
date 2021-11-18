import React from 'react';
import PropTypes from 'prop-types';
import AuctionBoardItem from './AuctionBoardItem';

const AuctionBoardList = ({ data }) => (
  <>
    {data.map((board, index) => (
      <div className="mt-4" key={index}>
        <AuctionBoardItem />
      </div>
    ))}
  </>
);

AuctionBoardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AuctionBoardList;
