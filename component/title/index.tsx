type Props = {
  title: string | string[] | undefined;
};

export const TitleDashboard = ({ title }: Props) => {
  return (
    <div className="capitalize text-md font-semibold font-raleway">{title}</div>
  );
};
