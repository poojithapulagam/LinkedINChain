import NextLink from 'next/link';

export default function Link(props: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props}>
      <a className="text-inherit no-underline hover:underline hover:text-blue-600 transform transition-transform duration-300">
        {props.children}
      </a>
    </NextLink>
  );
}
