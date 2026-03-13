import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEOHead({
  title = "Stevia LMJ - Pemanis Alami Lumajang",
  description = "Pemanis alami Stevia dari Lumajang. Solusi hidup sehat tanpa rasa bersalah. 100% Alami, 0 Kalori, Aman untuk Diabetes.",
  image = "/images/hero-stevia-lmj.webp",
  url = "https://stevialmj.my.id",
  type = "website",
}: SEOHeadProps) {
  const siteTitle = title === "Stevia LMJ - Pemanis Alami Lumajang" ? title : `${title} | Stevia LMJ`;
  
  // Ensure image URL is absolute for OG tags
  const absoluteImageUrl = image.startsWith("http") 
    ? image 
    : `https://stevialmj.my.id${image.startsWith("/") ? "" : "/"}${image}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImageUrl} />
    </Helmet>
  );
}
