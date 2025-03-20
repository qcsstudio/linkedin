const BlogCard = () => {
    return (
        <>
            <div className="cardContainer w-[30.75rem] h-[19.18rem] bg-gradient-to-r from-[rgba(94,120,143,1)] to-[rgba(240,248,255,1)] rounded-[.5rem] p-[0.5rem]">

                {/* Linear Border */}
                <div className="borderContainer w-[100%] h-[100%] border-[2px] border-[#D8DFE5] rounded-[.5rem] p-[0.5rem]">

                    {/* dotted Border */}
                    <div className="dottedBorder w-[100%] h-[100%] border-2 border-dashed border-[#D8DFE5] rounded-[.5rem] px-[1.3rem] flex flex-col justify-center">

                        {/* Upper Container */}
                        <div className='upperContainer'>
                            <p className="heading text-[1.87rem] font-bold text-[#ffffff]">Global Retailer’s</p>
                        </div>
                        
                        {/* Middle Container */}
                        <div className='middleContainer mt-[.5rem] mb-[1rem]'>
                            <p className="description text-[1rem] text-[#FFFFFF] leading-tight">A global retailer faced increasing cyber threats targeting customer payment data and internal systems. TAC Security implemented end-to-end vulnerability management, enhanced threat intelligence, and secure payment systems, resulting in zero data breaches over 12 months and boosting customer confidence by 25%.</p>
                        </div>
                        
                        {/* Lower Container */}
                        <div className='lowerContainer'>
                            <button className="bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white px-[2.37rem] py-[0.5rem] rounded-[.5rem]">Get Started</button>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default BlogCard