const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="border-b-2 border-b-slate-600 text-xl font-bold capitalize text-slate-600">
      {title}
    </h1>
  );
};

export default PageTitle;
