import React from 'react';

function Logo({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="37"
      viewBox="0 0 32 37"
    >
      <g fill={color ?? '#0E41F5'} fillRule="nonzero">
        <path d="M18.402 19.83l-2.08 4.463H0l2.08-4.463L7.443 8.325H4.155L13.497.134l2.023 8.191h-3.308L7.103 19.83z" />
        <path d="M12.912 16.329l2.08-4.461h16.321l-2.08 4.461-5.365 11.504h3.29l-9.344 8.192-2.02-8.192h3.307l5.107-11.504z" />
      </g>
    </svg>
  );
}

export default Logo;
