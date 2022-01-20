import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <path
          id="a"
          d="M7.333 0a7.333 7.333 0 100 14.666A7.333 7.333 0 007.333 0zm.734 11H6.6V9.533h1.467V11zm0-2.933H6.6v-4.4h1.467v4.4z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(.667 .667)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <use fill="#FF6728" fillRule="nonzero" xlinkHref="#a" />
        <g fill="#AEB1B7" mask="url(#b)">
          <path d="M-.667-.667h16v16h-16z" />
        </g>
      </g>
    </svg>
  );
}

export default Icon;
