interface CommentPreviewProps {
  html: string;
}

export default function CommentPreview({ html }: CommentPreviewProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
