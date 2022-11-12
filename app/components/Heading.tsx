export type HeadingProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h1 className={`text-xl dark:text-gray-300 text-gray-900 ${className}`}>
      {children}
    </h1>
  );
};
