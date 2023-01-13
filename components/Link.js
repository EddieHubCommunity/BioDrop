import React from 'react'
import NextLink from 'next/link'

export default function Link({ url, children, className, rel, target, key }) {
    return (
        <NextLink
            href={url}
            key={key || undefined}
            target={target || undefined}
            rel={rel ? rel : "noreferrer"}
            className={className ? className : "text-blue-600 underline decoration-dotted dark:text-blue-500 hover:underline hover:decoration-solid"}
        >
            {children}
        </NextLink>
    )
}