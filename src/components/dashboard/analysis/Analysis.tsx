import { Link } from "react-router-dom";

const data = [
  {
    title: "View event list",
    description: "List of all your events",
    route: "events",
  },
  {
    title: "View Analytics",
    description: "See Charts and Details about events",
    route: "event/analysis",
  },
];

const Analysis = () => {
  return (
    <section className="space-y-5">
      <div className="">
        <h1 className="text-xl font-semibold text-black/65">
          Choose Any Option
        </h1>
        <p className="text-sm font-medium text-black/40">
          Click to go to either see your events or analysis about your events
        </p>
      </div>
      <section className="flex items-start justify-start gap-5">
        {data.map((el, i) => (
          <Link to={el.route}>
            <div
              key={i}
              className="border rounded-md cursor-pointer hover:scale-[0.98] transition-transform duration-200 flex flex-col gap-1 items-center justify-center p-10"
            >
              <p className="text-black/90 font-semibold text-lg">{el.title}</p>
              <p className="text-black/50 text-sm font-medium">
                {el.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Analysis;
