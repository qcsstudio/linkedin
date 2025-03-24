const Button = ({text,backgroundColor,textColor,actions}) => {
    return (
        <>
            <button className={`text-[${textColor}] ${backgroundColor === "#F0F0F0" ? "bg-[#e5e7eb]" : "bg-[#007BFF] "} p-2 rounded-[.5rem]`} >{text}</button>
        </>
    )
}

export default Button