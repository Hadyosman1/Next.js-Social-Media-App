import useTextDirByLine from "@/hooks/useTextDirByLine";

const Title = ({ str }: { str: string }) => {
  const result = useTextDirByLine(str);

  return <>{result}</>;
};

export default Title;
