function CExternalLink({ content, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="color-primary"
    >{content}
    </a>
  );
}

export default CExternalLink;
