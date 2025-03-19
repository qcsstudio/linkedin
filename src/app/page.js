// "use client"
// import Head from 'next/head';
// import { useEffect, useState } from 'react';
import HomeContainer from '@/containers/HomeContainer/HomeContainer';

export default function Home() {
  return <HomeContainer/>
  
  // const [blogPosts, setBlogPosts] = useState([]);
  // const [pricingPlans, setPricingPlans] = useState([]);

  // useEffect(() => {
  //   const fetchedPricingPlans = [
  //     { name: 'Starter', price: 9, features: ['AI Post Scheduling', 'Content Generation', 'Basic Analytics'] },
  //     { name: 'Pro', price: 29, features: ['Advanced Analytics', 'Multi-Platform Support', 'Priority Support'] },
  //     { name: 'Agency', price: 79, features: ['Team Collaboration', 'Comprehensive Analytics', 'Early Feature Access'] },
  //   ];

  //   const fetchedBlogPosts = [
  //     { id: 1, title: 'Financial Insights', excerpt: 'Boost your brand with smart financial insights.' },
  //     { id: 2, title: 'Healthcare Trends', excerpt: 'Explore the future of healthcare with AI.' },
  //     { id: 3, title: 'E-Commerce Hacks', excerpt: 'Top strategies to grow your e-commerce business.' },
  //     { id: 4, title: 'Global Retail', excerpt: 'Understanding international retail dynamics.' },
  //   ];

  //   setBlogPosts(fetchedBlogPosts);
  //   setPricingPlans(fetchedPricingPlans);
  // }, []);

  // return (
  //   <div className="bg-gray-100 text-gray-900">
  //     <Head>
  //       <title>ElevatrX - AI-Powered Social Media Automation</title>
  //     </Head>

  //     {/* Hero Section */}
  //     <section className="text-center py-20 bg-white">
  //       <h1 className="text-4xl font-bold">Transform Your Social Media Presence with AI-Powered Automation</h1>
  //       <p className="mt-4">Effortlessly boost brand visibility, increase audience engagement, and reclaim hours every week.</p>
  //       <div className="mt-6 space-x-4">
  //         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Start 14-Day Free Trial</button>
  //         <button className="bg-gray-200 px-6 py-2 rounded-lg">Watch Demo</button>
  //       </div>
  //     </section>

  //     {/* Pricing Section */}
  //     <section className="py-20">
  //       <h2 className="text-3xl font-bold text-center">Flexible Pricing</h2>
  //       <div className="grid md:grid-cols-3 gap-6 mt-10 px-4">
  //         {pricingPlans.map((plan) => (
  //           <div key={plan.name} className="bg-white p-6 rounded-lg shadow-lg text-center">
  //             <h3 className="text-xl font-semibold">{plan.name}</h3>
  //             <p className="text-gray-600 mt-2">${plan.price}/month</p>
  //             <ul className="text-sm mt-4 space-y-2">
  //               {plan.features.map((feature, index) => (
  //                 <li key={index} className="text-gray-700">{feature}</li>
  //               ))}
  //             </ul>
  //             <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg">Get Started</button>
  //           </div>
  //         ))}
  //       </div>
  //     </section>

  //     {/* Blog Section */}
  //     <section className="py-20 bg-white">
  //       <h2 className="text-3xl font-bold text-center">Latest Blog Posts</h2>
  //       <div className="grid md:grid-cols-4 gap-6 mt-10 px-4">
  //         {blogPosts.map((post) => (
  //           <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
  //             <h3 className="text-lg font-semibold">{post.title}</h3>
  //             <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
  //             <button className="text-blue-600 mt-4">Read More</button>
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //   </div>
  // );
}












