import projectIcon from '@/public/images/icons/projectIcon.svg';
import dashboardIcon from '@/public/images/icons/dashboardIcon.svg';
import analiticsIcon from '@/public/images/icons/analiticsIcon.svg';
import goalsIcon from '@/public/images/icons/goalsIcon.svg';
import settingIcon from '@/public/images/icons/settingIcon.svg';
import signoutIcon from '@/public/images/icons/signoutIcon.svg';
import helpIcon from '@/public/images/icons/helpIcon.svg';

export const SideBarLinks = [
    {
        title: 'Dashboard',
        icon: dashboardIcon,
        href: '/dashboard',
    },
    {
        title: 'Projects',
        icon: projectIcon,
        href: '/projects',
    },
    {
        title: 'Goals',
        icon: goalsIcon,
        href: '/projects',
    },
    {
        title: 'Analitics',
        icon: analiticsIcon,
        href: '/analitics',
    },
    {
        title: 'Settings',
        icon: settingIcon,
        href: '/settings',
    },
    {
        title: 'Help',
        icon: helpIcon,
        href: '/help',
    },
    {
        title: 'Sign out',
        icon: signoutIcon,
        href: '/sign-out',
    },
]