import React from 'react';

export const activeOrderTHeader = ['TX Hash', 'Sell', 'Buy', 'Date', '#'];
export const completeOrderTHeader = ['Sold', 'Bought', 'Date'];
export const arrowRightSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0L24 0 24 24 0 24z" transform="rotate(-90 12 12)" />
      <g stroke="#AEB1B7" id="arrow" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M6.01.51L6.01 15.49M.023 9.507L6 15.483 11.977 9.507" transform="rotate(-90 12 12) translate(6 4)" />
      </g>
    </g>
  </svg>
);
