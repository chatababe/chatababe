declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
};

declare type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  createdAt: Date;
};

declare type LocationOption = {
  value: string;
  label: string;
};

interface Stream {
  id: string;
  isLive: boolean;
  approved: boolean;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  thumbnailUrl: string | null;
  name: string;
}

interface PageProps {
  searchParams: Promise<{
    type?: string;
    year?: string; 
    room?: string;
    genre?: string;
    country?: string;
  }>
 }

interface FilterTags {
  year?: string;
  room?: string;
  genre?: string;
  country?: string;
}
interface StreamsProps {
  id: string;
  name: string;
  type: string | null;
  tags: string[];
  user: {
    id: string;
    profile: {
      age: number;
    } | null;
    username: string;
    imageUrl: string;
  };
  thumbnailUrl: string | null;
  goalText: string | null;
  isLive: boolean;
}
