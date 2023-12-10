import clsx from 'clsx';

export interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
}

export default function TextField({
  className,
  ...otherProps
}: TextFieldProps) {
  return (
    <input
      autoComplete="off"
      className={clsx(
        'h-12 border-b border-solid border-gray-300 bg-white px-4 py-2 font-mono text-gray-700 focus:border-blue-500 focus:outline-none',
        className,
      )}
      type="text"
      {...otherProps}
    />
  );
}
