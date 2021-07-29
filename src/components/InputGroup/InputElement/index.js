const InputElementText = ({ text, height, fontSize }) => (
  <span className="input-group-text" style={{ height: `${height}px`, fontSize: `${fontSize}px` }}>
    {text}
  </span>
);

export default InputElementText;
