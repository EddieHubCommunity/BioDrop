import React from 'react'
import NextLink from 'next/link'

export default function Link({ url, children }) {
    return (
        <NextLink
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline decoration-dotted dark:text-blue-500 hover:underline hover:decoration-solid"
        >
            {children}
        </NextLink>
    )
}