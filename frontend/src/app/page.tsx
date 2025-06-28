'use client';

import dynamic from 'next/dynamic';

// Dynamically import components that use client-side features
const Hero = dynamic(() => import('@/components/sections/Hero'));
const Features = dynamic(() => import('@/components/sections/Features'));
const FeaturedCollections = dynamic(() => import('@/components/sections/FeaturedCollections'));
const Categories = dynamic(() => import('@/components/sections/Categories'));
const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks'));
const USPGrid = dynamic(() => import('@/components/sections/USPGrid'));
const TrustBadges = dynamic(() => import('@/components/sections/TrustBadges'));
const About = dynamic(() => import('@/components/sections/About'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const BlogPreview = dynamic(() => import('@/components/sections/BlogPreview'));
const InstagramFeed = dynamic(() => import('@/components/sections/InstagramFeed'));
const AppPromo = dynamic(() => import('@/components/sections/AppPromo'));
const BrandLogos = dynamic(() => import('@/components/sections/BrandLogos'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter'));


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      {/* <FeaturedCollections autoplay items={5} /> */}
      <Categories columns={4} />
      <HowItWorks
        steps={["Choose your products", "Add to cart", "Checkout securely", "Enjoy fast delivery"]}
        iconStyle="circle"
        layout="horizontal"
        headline="How Shopping Works"
      />
      <USPGrid
        items={["Clean Ingredients", "Cruelty-Free", "Free Returns", "24/7 Support"]}
        icons={true}
        columns={4}
        headline="Why Shop With Us"
      />
      <TrustBadges
        badges={["100% Secure", "FDA Approved", "Eco-Friendly", "Made in USA"]}
        layout="row"
        icons={true}
        headline="Shop With Confidence"
      />
      <About />
      {/* <Testimonials /> */}
      {/* <BlogPreview
        max={3}
        layout="grid"
        headline="Latest from the Blog"
        showDate={true}
        showAuthor={true}
        cta="Read More"
      /> */}
      {/* <InstagramFeed
        username="@yourbrand"
        posts={6}
        columns={3}
        cta="Shop the Look"
        style="masonry"
      /> */}
      {/* <BrandLogos /> */}
      {/* <AppPromo
        headline="Get our App"
        subtext="Shop faster and easier on our mobile app."
        buttons={["App Store", "Google Play"]}
        imageStyle="phone-mockup"
      /> */}
      <FAQ
        items={["What is your return policy?", "Do you offer international shipping?", "How can I track my order?"]}
        expandable={true}
        layout="accordion"
        headline="Frequently Asked Questions"
      />
      {/* <Newsletter style="card" variant="primary" offer="Get 10% off your first order" /> */}
    </div>
  );
}