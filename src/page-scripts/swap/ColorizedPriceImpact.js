export default function ColorizedPriceImpact({ impact }) {
  let final = 0;
  let color = '#21B479';

  if (impact.isLessThan(0.1)) {
    final = '<0.1';
  } else {
    final = impact.toFixed(1);
  }

  if (impact.isLessThan(1)) {
    color = '#21B479';
  } else if (impact.isLessThan(20)) {
    color = '#F2754F';
  } else {
    color = '#EA4949';
  }

  return <span style={{ color }}> {final}% </span>;
}
