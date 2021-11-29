function BigLogo({ color }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
      <g fill={color ?? '#0E41F5'} fillRule="nonzero">
        <path d="m8.227 8.643-.93 1.959H0l.93-1.959 2.398-5.048h-1.47L6.034 0l.905 3.595h-1.48L3.177 8.643z" />
        <path d="m5.773 7.107.93-1.958H14l-.93 1.958-2.399 5.048h1.471L7.965 15.75l-.904-3.595h1.48l2.283-5.048z" />
      </g>
    </svg>
  );
}

export default BigLogo;
