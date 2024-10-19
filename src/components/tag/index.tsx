import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className="inline-block bg-[#18181880] text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded border border-[#1f1f1f] overflow ">
            #&nbsp;{text}
        </span>
    );
};

export default Tag;
