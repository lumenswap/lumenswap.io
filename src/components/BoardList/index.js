import React from 'react';
import PropTypes from 'prop-types';
import BoardItem from './BoardItem';

const BoardList = ({ data }) => (
  <>
    {data.map((board, index) => (
      <div className="mt-4" key={index}>
        <BoardItem />
      </div>
    ))}
  </>
);

BoardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BoardList;
