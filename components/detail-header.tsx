export interface DetailHeaderProps {
  children: React.ReactNode;
}

export default function DetailHeader({ children }: DetailHeaderProps) {
  return (
    <header className="mb-2 flex flex-col border-b border-solid border-blue-500 pb-2 text-white bg-blue-500">
      {children}
    </header>
  );
}
