type StatProps = {
  value: string | number;
  label: string;
};

const Stat = ({ value, label }: StatProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

export default Stat;
