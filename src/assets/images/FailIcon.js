import React from 'react';

function Icon({ color }) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path d="M19.25 0C8.618 0 0 8.618 0 19.25S8.618 38.5 19.25 38.5 38.5 29.882 38.5 19.25 29.882 0 19.25 0zm1.925 28.875h-3.85v-3.85h3.85v3.85zm0-7.7h-3.85V9.625h3.85v11.55z" id="ieyvkcdpfa" />
      </defs>
      <g transform="translate(1.75 1.75)" fill="none" fillRule="evenodd">
        <mask id="1eosrwa1eb" fill="#fff">
          <use xlinkHref="#ieyvkcdpfa" />
        </mask>
        <use fill="#FF6728" fillRule="nonzero" xlinkHref="#ieyvkcdpfa" />
        <g mask="url(#1eosrwa1eb)" fill={color ?? '#DB2F2F'}>
          <path d="M-1.75-1.75h42v42h-42z" />
        </g>
      </g>
    </svg>
  );
}

export default Icon;
