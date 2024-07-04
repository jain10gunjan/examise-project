// components/AngryBirdsSchema.tsx

import Script from 'next/script';
// import { SoftwareApplicationProps } from '../interfaces';
// interfaces.ts

interface SoftwareApplicationProps {
    name: string;
    operatingSystem: string;
    applicationCategory: string;
    ratingValue: string;
    ratingCount: string;
    price: string;
    priceCurrency: string;
  }

  
const AngryBirdsSchema: React.FC<SoftwareApplicationProps> = ({
  name,
  operatingSystem,
  applicationCategory,
  ratingValue,
  ratingCount,
  price,
  priceCurrency,
}) => (
  <Script id="my-script" type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "${name}",
        "operatingSystem": "${operatingSystem}",
        "applicationCategory": "${applicationCategory}",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "${ratingValue}",
          "ratingCount": "${ratingCount}"
        },
        "offers": {
          "@type": "Offer",
          "price": "${price}",
          "priceCurrency": "${priceCurrency}"
        }
      }
    `}
  </Script>
);

export default AngryBirdsSchema;
