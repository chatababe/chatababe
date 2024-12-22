import { User } from "lucide-react";


const UserIcon = ({ type }: { type: string }) => {
  const typeClass = {
    "male": "#007BFF",
    "female": "#FF69B4",
    "couple": "#8A2BE2",
    "trans": "#dfe22b",
  }[type];

  return <User fill={typeClass} color={typeClass} size={16} />;
};

export default UserIcon;
