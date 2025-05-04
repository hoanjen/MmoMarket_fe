import { useState, useEffect, useRef, forwardRef } from 'react';
import { ProductApi } from '@api/product/product'
import { useParams, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

type commentProduct = {
    id: string,
    star: number,
    content: string,
    user:{
        id: string,
        first_name: string,
        last_name: string,
        avatar: string
    }
}[]

export default function Comment (){
    const { id } = useParams<{ id: string}>()
    const [valuesComment, setValuesComment] = useState<commentProduct>(
        [
            {
                id: '',
                star: 0,
                content: '',
                user:{
                    id: '',
                    first_name: '',
                    last_name: '',
                    avatar: ''
                }
            }
        ]
    )

    const fectchApiComment = async () => {
        try {
            if(id){
                const res = await ProductApi.getCommentByProductId({product_id: id});
                setValuesComment(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fectchApiComment()
    }, []);

    return (
        <>
            {
                valuesComment.map((item, index)=>{
                    return <div key={index} className="relative flex w-full flex-col bg-transparent bg-clip-border text-gray-700 shadow-none border-b border-slate-300">
                        <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                            {
                                item.user.avatar == "avatar" ?
                                <Avatar sx={{width: 58, height: 58}} src="/broken-image.jpg" />
                                :
                                <img
                                    src={item.user.avatar}
                                    className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center" />
                            }
                            <div className="flex w-full flex-col gap-0.5">
                                <div className="flex items-center justify-between">
                                    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {item.user.first_name + " " + item.user.last_name}
                                    </h5>
                                    <div className="flex items-center gap-0.5">
                                        <Rating name="read-only" value={item.star} readOnly />
                                    </div>
                                </div>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                                </p>
                            </div>
                        </div>
                        <div className="p-0 mb-6">
                            <div className="block w-full font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                {item.content}
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}