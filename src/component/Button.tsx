import { LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx'
import React from 'react'

type Props = {
    buttonLink:LinkField,
    buttonText:string| null ,
    className:string,

}

export default function Button({buttonLink, buttonText,className}: Props) {
  return (
    <div>

<PrismicNextLink className={clsx("rounded-xl bg-orange-600 px-5 py-4    text-center font-bolf uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl ",className)}   field={buttonLink}>
      {buttonText}
      </PrismicNextLink>
    </div>
  )
}