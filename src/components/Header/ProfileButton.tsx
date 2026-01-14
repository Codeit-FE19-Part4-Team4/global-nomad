import Profile from '@/components/Profile';

interface ProfileButtonProps {
  name: string | undefined;
  url: string | undefined;
  onClick: () => void;
}

export default function ProfileButton({
  name,
  url,
  onClick,
}: ProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2"
      aria-haspopup="menu">
      <Profile size="sm" src={url}></Profile>
      <span className="text-sm text-gray-950">{name}</span>
    </button>
  );
}
