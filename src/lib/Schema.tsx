// components/AngryBirdsSchema.tsx
"use client";

import Script from "next/script";
// import { SoftwareApplicationProps } from '../interfaces';
// interfaces.ts

export interface SoftwareApplicationProps {
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
}) => {
  return (
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
};

export default AngryBirdsSchema;
