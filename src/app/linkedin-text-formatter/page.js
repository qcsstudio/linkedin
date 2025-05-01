import LinkedInFormatter from '@/containers/LinkedinTextFormatter/LinkedinTextFormatter';
import React from 'react'

export const metadata = {
    title: "Free LinkedIn Text Formatter – Bold, Italic, Underline & Strikethrough | No Signup",
    description:"Format your LinkedIn posts and profile text in seconds—bold, italic, underline, strikethrough & more. 100% free, no signup, Unicode-powered. Copy & paste to stand out!"
  };

function page() {
  return (
    <div><LinkedInFormatter/></div>
  )
}

export default page