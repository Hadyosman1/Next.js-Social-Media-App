import useTextDirByLine from "@/hooks/useTextDirByLine";

const Description = ({ str }: { str: string }) => {
  const result = useTextDirByLine(str);

  return <>{result}</>;
};

export default Description;
