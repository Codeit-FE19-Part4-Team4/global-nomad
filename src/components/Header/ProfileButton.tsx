import Profile from '@/components/Profile';

interface ProfileButtonProps {
  name: string;
  onClick: () => void;
}

export default function ProfileButton({ name, onClick }: ProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2"
      aria-haspopup="menu">
      <Profile size="sm"></Profile>
      <span className="text-sm text-gray-950">{name}</span>
    </button>
  );
}
