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
          id="v8fv1m8uua"
          d="M7.167 0a7.167 7.167 0 110 14.333A7.167 7.167 0 017.167 0zm0 1.103a6.064 6.064 0 100 12.128 6.064 6.064 0 000-12.128zm0 1.102c.279 0 .51.208.546.477l.005.074V6.77l2.162.72a.551.551 0 01.367.625l-.018.073a.551.551 0 01-.625.368l-.073-.02-2.539-.845a.551.551 0 01-.371-.445l-.006-.078v-4.41c0-.305.247-.552.552-.552z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(.833 .833)">
        <mask id="5pje0zyhab" fill="#fff">
          <use xlinkHref="#v8fv1m8uua" />
        </mask>
        <use fill="#323232" fillRule="nonzero" xlinkHref="#v8fv1m8uua" />
        <g fill="#F77F5A" mask="url(#5pje0zyhab)">
          <path d="M-.833-.833h16v16h-16z" />
        </g>
      </g>
    </svg>
  );
}

export default Icon;
