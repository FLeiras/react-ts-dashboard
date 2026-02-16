type HighlightTextProps = {
  text: string;
  highlight: string;
};

export default function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight) return <>{text}</>;

  const regex = new RegExp(`(${highlight})`, 'ig');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="bg-yellow-200 dark:bg-yellow-600/40 rounded px-1"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
