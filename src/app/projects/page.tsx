import { NextPage } from 'next'
import ProjectItem from '@/components/projects/project-item'
import { Projects } from '@/data/projects/projects'
import type { Metadata } from 'next'
import { Wrapper } from '@/components/wrapper'

export const metadata: Metadata = {
    title: '姚利锋 | 项目',
    description: '姚利锋 | 项目'
}

const Page: NextPage = () => {
    return (
        <Wrapper className="container px-4 py-8 md:px-6 md:py-12">
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">项目</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                {Projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        name={project.name}
                        description={project.description}
                        link={project.link}
                        author={project.author}
                        author_link={project.author_link}
                        avatar={project.avatar}
                        home_link={project.home_link}
                    />
                ))}
            </div>
        </Wrapper>
    )
}

export default Page
