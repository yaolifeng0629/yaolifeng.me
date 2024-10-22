import React from 'react';
import Image from 'next/image'

interface shortBgProps {
    text: string;
}

const shortBg: React.FC<shortBgProps> = ({ text }) => {
    return (
        <blockquote className="relative w-[300px] h-[250px] flex items-center ">
            <Image
                src="/other/bg.png"
                alt={text}
                className='object-cover z-[1]'
                width={300}
                height={250}
            />

            <p className="absolute w-[80%] z-10 text-gray-800 font-bold text-2xl left-[5%] box-border leading-8 font-serif
                           overflow-hidden
                           [display:-webkit-box]
                           [-webkit-line-clamp:6]
                           [-webkit-box-orient:vertical]
                           text-ellipsis">
                {text}
            </p>
        </blockquote>
    );
};

export default shortBg;
