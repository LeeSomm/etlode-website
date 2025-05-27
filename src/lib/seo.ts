// SEO Configuration for ET-Lode Website
// This file contains centralized SEO settings and metadata

export const seoConfig = {
  site: {
    name: 'ET-Lode',
    url: 'https://etlode.com',
    description: 'AI automation consultancy specializing in multilingual solutions for global businesses',
    keywords: [
      'etlode',
      'et-lode', 
      'ET-Lode',
      'etlode ai',
      'etlode llc',
      'etlode automation',
      'etlode consulting',
      'AI automation',
      'multilingual chatbots',
      'RAG LLM',
      'workflow automation',
      'Japanese English translation',
      'business process optimization',
      'artificial intelligence consulting',
      'global business solutions',
      'multilingual AI',
      'business automation',
      'AI chatbots',
      'language processing',
      'international business',
      'AI solutions',
    ]
  },
  
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ET-Lode, LLC',
    alternateName: ['etlode', 'ET-Lode', 'etlode ai', 'etlode llc', 'ET-Lode LLC'],
    url: 'https://etlode.com',
    logo: 'https://etlode.com/images/etlode-logo-w-name.png',
    description: 'AI automation consultancy specializing in multilingual solutions for global businesses',
    foundingDate: '2024',
    slogan: 'Extract, Transform, Load - AI Automation for Global Business',
    founder: {
      '@type': 'Person',
      name: 'Lee Sommerfeldt'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-775-391-8120',
      contactType: 'Customer Service',
      email: 'lee@etlode.com',
      availableLanguage: ['English', 'Japanese']
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.linkedin.com/company/etlode/'
    ]
  },
  
  openGraph: {
    siteName: 'ET-Lode',
    locale: 'en_US',
    localeAlternate: ['ja_JP'],
    type: 'website'
  },
  
  twitter: {
    cardType: 'summary_large_image'
  },
  
  languages: {
    default: 'en',
    supported: ['en', 'ja'],
    urls: {
      en: 'https://etlode.com',
      ja: 'https://etlode.com?lang=ja'
    }
  }
};

export default seoConfig;
