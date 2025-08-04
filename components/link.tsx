import NextLink from 'next/link';

export default function Link(props: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props}>
      <a className="text-inherit no-underline hover:text-gray-600 transition-colors duration-200">
        {props.children}
      </a>
    </NextLink>
  );
}
