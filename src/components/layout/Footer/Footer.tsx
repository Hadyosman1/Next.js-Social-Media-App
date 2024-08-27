const Footer = () => {
  return (
    <footer className="mt-auto bg-blue-500">
      <div className="main-props container p-4 text-center text-slate-100">
        <h5>
          All rights reserved &copy; {new Date().getFullYear().toString()}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
