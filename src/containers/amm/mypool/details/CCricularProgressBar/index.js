import { CircularProgressbar } from 'react-circular-progressbar';

function CCricularProgressBar({
  value, text, styles, size, strokeWidth, className,
}) {
  return (
    <div className={className} style={{ width: `${size}px`, height: `${size}px` }}>
      <CircularProgressbar
        background
        value={value}
        text={text}
        styles={styles}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}

export default CCricularProgressBar;
