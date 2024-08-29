type TProps = {
  searchParams: { searchKey: string };
};

const ArticlesSearch = ({ searchParams }: TProps) => {
  return (
    <div className="container main-props py-12">
      <h1 className="text-xl font-bold text-gray-700">Search text : {searchParams.searchKey}</h1>
    </div>
  );
};

export default ArticlesSearch;
