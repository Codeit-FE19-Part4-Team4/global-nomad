import githubIcon from '@/assets/icons/common/ic-github.svg';
import notionIcon from '@/assets/icons/common/ic-notion.svg';
import youtubeIcon from '@/assets/icons/common/ic-youtube.svg';

export const FOOTER_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Codeit-FE19-Part4-Team4/global-nomad.git',
    icon: githubIcon,
  },
  {
    label: 'Notion',
    href: 'https://www.notion.so/2c5df82f6bdf80b58068d6613a2f06d2?source=copy_link',
    icon: notionIcon,
  },
  {
    label: 'YouTube',
    href: '#', //TODO
    icon: youtubeIcon,
  },
] as const;
