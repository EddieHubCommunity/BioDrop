import React from 'react'
import NextLink from 'next/link'

export default function Link({ url, children, className = undefined, rel = undefined, target = undefined }) {
    return (
        <NextLink
            href={url}
            target={target}
            rel={rel ? rel : "noreferrer"}
            className={className ? className : "text-blue-600 underline decoration-dotted dark:text-blue-500 hover:underline hover:decoration-solid"}
        >
            {children}
        </NextLink>
    )
}