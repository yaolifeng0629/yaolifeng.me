import React from 'react';
import Link from 'next/link';

interface ProjectItemProps {
    name: string;
    description: string;
    link: string;
    author: string;
    author_link: string;
    avatar: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ name, description, link, author, author_link, avatar }) => {
    return (
        <div className="relative block overflow-hidden rounded-lg border border-[#18181b] no-underline md:p-4 hover:bg-primary-foreground p-3 ">
            <Link href={link} target="_blank" >
                <div className="flex">
                    <div className='flex-1'>
                        <h3 className="text-lg font-bold sm:text-md text-ellipsis mt-0 whitespace-pre-wrap" title={name}>
                            {name}
                        </h3>

                        <Link href={author_link} target="_blank" className="mt-1 text-xs font-medium text-gray-300 no-underline" >{author}</Link>
                    </div>

                    <div className="sm:shrink-0 ">
                        <img
                            src={avatar}
                            alt="Project Author Avatar"
                            className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-sm mt-0 overflow-hidden border-none outline-none"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-pretty text-sm text-gray-400 line-clamp-2 text-ellipsis m-0" title={description}>
                        {description}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProjectItem;
