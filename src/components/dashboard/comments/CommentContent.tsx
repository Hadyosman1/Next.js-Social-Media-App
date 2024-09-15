import useTextDirByLine from "@/hooks/useTextDirByLine";

const CommentContent = ({ str }: { str: string }) => {
  const result = useTextDirByLine(str);
  return <>{result}</>;
};

export default CommentContent;
