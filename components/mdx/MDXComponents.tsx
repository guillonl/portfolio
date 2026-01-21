import { DetailedHTMLProps, HTMLAttributes } from 'react'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

function H2({ children, ...props }: HeadingProps) {
  const text = typeof children === 'string' ? children : ''
  const id = slugify(text)

  return (
    <h2 id={id} className="scroll-mt-8" {...props}>
      {children}
    </h2>
  )
}

export const mdxComponents = {
  h2: H2,
}
