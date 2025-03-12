const Button = ({text,backgroundColor,textColor,actions}) => {
    return (
        <>
            <button className={`text-[${textColor}] ${backgroundColor === "#F0F0F0" ? "bg-[#F0F0F0]" : "bg-[#007BFF]"} px-[4.1rem] py-[0.4rem] rounded-[.5rem]`} >{text}</button>
        </>
    )
}

export default Button