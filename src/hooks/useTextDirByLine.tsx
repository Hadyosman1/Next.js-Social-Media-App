const useTextDirByLine = (text: string) => {
  return text.split(/\n/).map((line, i) => (
    <p dir="auto" key={i}>
      {line}
    </p>
  ));
};

export default useTextDirByLine;
