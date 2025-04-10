'use client'
import Footer from '@/components/HomeComponent/Footer/Footer'
import Navbar from '@/components/HomeComponent/NavbarHome/NavbarHome'
import SingleBlogSection from '@/components/HomeComponent/Blogs/SingleBlogPageComponets/SingleBlogSection'
import React, { useContext, useEffect } from 'react'
import NeedHelp from '@/components/HomeComponent/NeedHelp/NeedHelp'
import { BlogDataContext } from '@/Context/Blogs.context'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import BlogsSlider from '@/components/HomeComponent/Blogs/SingleBlogPageComponets/BlogsSlider'

const SingleBlogPageContainer = () => {
  const { GetSingleBlogData, blogData, showBlogsDataLoader } = useContext(BlogDataContext);

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      GetSingleBlogData(slug);
    }
  }, [slug]);

  return (
    <div className="mainContainer font-syne relative z-10 bg-[url(/images/homeImages/grain.png)] bg-cover bg-no-repeat w-full min-h-screen overflow-hidden">
      <div className="bg-[#5E788F]/85 flex flex-col gap-3 md:gap-6 lg:gap-10">
        <Navbar />

        {/* Loader or HeroSection */}
        {showBlogsDataLoader ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <div className="text-white text-xl animate-pulse">Loading blog...</div>
          </div>
        ) : (
          <>
          <SingleBlogSection blogData={blogData} />
          <BlogsSlider/>
          </>
        )}

        <NeedHelp />
        <Footer  />

        {/* Background rays */}
        <div className="w-full h-[117.5rem] absolute top-0 left-0 z-[1]">
          <Image
            src="/images/homeImages/rays.png"
            width={1024}
            height={1024}
            alt="rays"
            className="w-full h-full imageDrag opacity-80 z-[1]"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPageContainer;
