export default function toSlug(string) {
  return string
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+$/g, '');
}
