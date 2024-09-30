import useTextDirByLine from "@/components/shared/FixTextDirection";

const CommentContent = ({ str }: { str: string }) => {
  const result = useTextDirByLine(str);
  return <>{result}</>;
};

export default CommentContent;
