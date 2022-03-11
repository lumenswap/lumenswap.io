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
          id="qivjxznzwa"
          d="M7.333 0a7.335 7.335 0 017.33 7.126l.004.207a7.335 7.335 0 01-7.126 7.33l-.208.004A7.335 7.335 0 01.003 7.54L0 7.333A7.335 7.335 0 017.126.003zm0 1.128l-.183.003a6.203 6.203 0 00-6.022 6.194l.003.192a6.203 6.203 0 006.194 6.022l.192-.003a6.203 6.203 0 006.022-6.195l-.003-.19a6.205 6.205 0 00-6.203-6.023zm3.408 4.302c.2.2.218.514.054.735l-.054.063-3.76 3.76a.564.564 0 01-.735.055l-.064-.054-2.256-2.257a.564.564 0 01.734-.852l.064.054L6.58 8.792 9.943 5.43c.22-.22.577-.22.798 0z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(.667 .667)">
        <mask id="v5goggscob" fill="#fff">
          <use xlinkHref="#qivjxznzwa" />
        </mask>
        <use fill="#323232" fillRule="nonzero" xlinkHref="#qivjxznzwa" />
        <g fill="#29B87F" mask="url(#v5goggscob)">
          <path d="M-.667-.667h16v16h-16z" />
        </g>
      </g>
    </svg>
  );
}

export default Icon;
