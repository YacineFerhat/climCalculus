interface Props {
  title: string;
}
export const Label = ({ title }: Props) => {
  return (
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor={title}
    >
      {title}
    </label>
  );
};
