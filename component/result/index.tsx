interface Props {
  result: number;
  value?: string;
  css?: string;
}
export const ResultCalcul = ({ result, value, css }: Props) => {
  return (
    <p
      className={`block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 ${css}`}
    >
      {result.toFixed(2)} {value}
    </p>
  );
};
