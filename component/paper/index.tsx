interface Props {
  readonly children?: any;
}

export const Paper = ({ children }: Props) => {
  return <div className="bg-white rounded-sm p-4">{children}</div>;
};
