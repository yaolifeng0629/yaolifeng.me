import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className="inline-block bg-[#21212180] text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded border overflow border-[#21212180]-700">
            #&nbsp;{text}
        </span>
    );
};

export default Tag;
