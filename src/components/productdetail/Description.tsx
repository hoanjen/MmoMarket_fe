
export default function Description (
    {
        description
    }
    :{
        description: string
    }
){
    return (
        <>
        {/* <div>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit py-2">
                Gmail reg bằng iOS, random IP, name US
            </p>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit py-2">
                Định dạng mail:
            </p>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit py-2">
                - Gmail|Mật khẩu|Recovery Email|Country
            </p>
        </div>
        <div>
            <img
            className="h-auto w-1/2 rounded-lg"
            src="https://img.upanh.tv/2024/03/19/huongdan.png"
            alt=""
            />
        </div> */}
            <div>
            {description}
            </div>
        </>
    )
}