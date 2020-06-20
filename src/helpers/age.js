import humanizeDuration from 'humanize-duration';

export default function age(date) {
  return humanizeDuration(
    Date.now() - new Date(date).getTime(),
    { round: true, largest: 1 },
  );
}
