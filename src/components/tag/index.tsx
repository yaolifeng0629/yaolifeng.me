import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className="bg-[#18181880] flex-shrink-0 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded border border-[#1f1f1f] whitespace-nowrap overflow-hidden text-ellipsis hover:text-primary">
            #&nbsp;{text}
        </span>
    );
};

export default Tag;
