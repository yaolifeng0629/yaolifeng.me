import {
    IconBrandBilibili,
    IconBrandGithub,
    IconLogoJuejin,
    IconsLogoGitee,
    IconLogoTwitter,
    IconLogoYoutube,
    IconLogoWeChat,
    IconSkillGmailDark,
    IconSkillGmailLight
} from '@/components/icons';

import { BILIBILI_PAGE, EMAIL, GITHUB_PAGE, JUEJIN_PAGE } from '@/constants';

const socialMediaList: Array<{
    icon: React.ReactNode;
    label: string;
    link: string;
}> = [
    {
        icon: <IconBrandGithub className="text-2xl" />,
        label: 'Github(yaolifeng0629)',
        link: GITHUB_PAGE
    },
    {
        icon: <IconLogoYoutube className="text-2xl" />,
        label: 'Youtube(Immerse)',
        link: GITHUB_PAGE
    },
    {
        icon: <IconLogoWeChat className="text-2xl" />,
        label: 'WeChat(15829485647)',
        link: GITHUB_PAGE
    },
    {
        icon: <IconsLogoGitee className="text-2xl" />,
        label: 'Gitee(yaolifeng0529)',
        link: GITHUB_PAGE
    },
    {
        icon: <IconLogoTwitter className="text-2xl" />,
        label: 'Twitter(Immerse_code)',
        link: GITHUB_PAGE
    },
    {
        icon: (
            <>
                <IconSkillGmailDark className="text-2xl dark:hidden" />
                <IconSkillGmailLight className="hidden text-2xl dark:inline-block" />
            </>
        ),
        label: 'Gmail(yaolifeng666@gmail.com)',
        link: `mailto:${EMAIL}`
    },
    {
        icon: <IconBrandBilibili className={`text-2xl text-[#00AEEC]`} />,
        label: 'Bilibili(Immerse_001)',
        link: BILIBILI_PAGE
    },
    {
        icon: <IconLogoJuejin className={`text-2xl text-[#2985fc]`} />,
        label: '掘金(Immerse)',
        link: JUEJIN_PAGE
    }
];

export default socialMediaList;
