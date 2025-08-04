import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="group h-10 w-10 sm:h-12 sm:w-12 cursor-pointer bg-black hover:bg-gray-800 border-2 border-black hover:border-gray-800 p-0 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transform transition-all duration-200 hover:-translate-x-1 rounded-lg shadow-sm"
      onClick={() => router.back()}
      type="button"
      aria-label="Go back"
    >
      <span className="relative -top-1 inline-block text-2xl sm:text-3xl leading-none text-white">
        ←
      </span>
    </button>
  );
}
