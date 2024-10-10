const NotFound = () => {
  return (
    <section className="h-screen w-full flex items-center gap-5 flex-col justify-center">
      <div className="flex items-end justify-center gap-5">
        <h1 className="text-3xl text-slate-900 font-semibold px-5 border-r border-slate-500">
          404
        </h1>
        <p className="text-base text-slate-500 font-medium">Page Not Found</p>
      </div>
    </section>
  );
};

export default NotFound;
