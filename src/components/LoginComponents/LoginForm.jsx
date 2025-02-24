import Image from "next/image"

const LoginForm = () => {
    return (
        <>
            {/* Main Login Container */}
            <div className="loginContainer w-[100%] h-[100vh] flex justify-around">

                {/* Left Container */}
                <div className="leftContainer w-[50%] h-[100%]">

                    {/* Image Container */}
                    <div className="imageContainer w-[100%] h-[100%] flex justify-center items-center ">
                        <Image src="/images/loginImages/companyLogo.png" width={1024} height={1024} alt="" className="w-[50%]"/>
                    </div>
                </div>

                {/* Right Container */}
                <div className="rightContainer">

                </div>

            </div>
        </>
    )
}

export default LoginForm