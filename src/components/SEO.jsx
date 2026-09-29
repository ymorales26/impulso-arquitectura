import { Helmet } from 'react-helmet-async';

const SITE = 'https://www.gimpulso.pe';
const DEFAULT_IMAGE = `${SITE}/img/proyectos/torre-leguia.webp`;

export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE }) {
  const url = `${SITE}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}