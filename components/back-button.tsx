import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="group h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-yellow-500 border-none p-0 focus:outline-none transform transition-transform hover:-translate-x-1 hover:scale-105 rounded-md shadow-md"
      onClick={() => router.back()}
      type="button"
    >
      <span className="relative -top-1 inline-block text-3xl sm:text-4xl lg:text-5xl leading-none">
        ⟵
      </span>
    </button>
  );
}
