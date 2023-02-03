import Link from 'next/link'

export default function InlineLink({ href, text, external }: any) {
  if (!text)
    return (
      <p className="inline-block rounded bg-red-500 p-2 text-center text-white">
        Inline link requires a text prop.
      </p>
    )

  if (external)
    return (
      <a
        className={`inline-block cursor-pointer text-french-blue underline hover:text-sapph-blue`}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {text}
      </a>
    )

  return (
    <Link
      className={`inline-block cursor-pointer text-french-blue underline hover:text-sapph-blue`}
      href={href}
    >
      {text}
    </Link>
  )
}
