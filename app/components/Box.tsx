interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className }) => (
  <div
    className={`text-gray-900 dark:text-white p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${className}`}
  >
    {children}
  </div>
);
