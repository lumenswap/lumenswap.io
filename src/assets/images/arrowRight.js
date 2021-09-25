import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="18"
      viewBox="0 0 24 18"
    >
      <defs>
        <path
          id="path-1"
          d="M11.403 20.23a1.113 1.113 0 01-.447-.2l-.015-.01a1.131 1.131 0 01-.096-.083l-.015-.015-7.502-7.502a1.125 1.125 0 011.465-1.7l.126.11 5.58 5.58.001-18.284a1.125 1.125 0 012.24-.152l.01.152V16.41l5.581-5.58c.4-.4 1.024-.436 1.465-.11l.126.11c.4.399.436 1.024.109 1.464l-.109.126-7.502 7.502-.014.014a1.132 1.132 0 01-.053.048l.067-.062c-.04.04-.082.076-.126.109l-.016.012a1.082 1.082 0 01-.402.18 1.054 1.054 0 01-.251.029l-.063-.002-.05-.004h-.007l-.102-.017z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(0 -3) matrix(1 0 0 -1 .375 20.627)">
          <mask fill="#fff">
            <use xlinkHref="#path-1" />
          </mask>
          <use
            fill="#8D8F9A"
            fillRule="nonzero"
            transform="rotate(-90 11.625 8.627)"
            xlinkHref="#path-1"
          />
        </g>
      </g>
    </svg>
  );
}

export default Icon;
