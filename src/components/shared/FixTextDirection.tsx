const FixTextDirection = ({text}:{text: string}) => {
  return text.split(/\n/).map((line, i) => (
    <p className="break-all" dir="auto" key={i}>
      {line}
    </p>
  ));
};

export default FixTextDirection;
