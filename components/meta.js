import Head from 'next/head'

const defaultTitle = 'Our Time'
const defaultDescription = 'Organizing for an affordable NYC'
const defaultCard = 'https://ourtime.nyc/card.png'
const url = 'https://ourtime.nyc'

const Meta = ({ title, description, card }) => {
  return (
    <Head>
      <title>{title ?? defaultTitle}</title>
      <meta name='description' content={description ?? defaultDescription} />
      <link rel='canonical' href={url} />
      <link rel='icon' type='image/png' href='/favicon/clock.png' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/clock-180x180.png'
      />
      <meta property='og:title' content={title ?? defaultTitle} />
      <meta
        property='og:description'
        content={description ?? defaultDescription}
      />
      <meta property='og:image' content={card ?? defaultCard} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={title ?? defaultTitle} />
      <meta
        name='twitter:description'
        content={description ?? defaultDescription}
      />
      <meta name='twitter:image' content={card ?? defaultCard} />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  )
}

export default Meta
