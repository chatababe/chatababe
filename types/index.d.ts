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
  searchParams: {
    year?: string;
    room?: string;
    genre?: string;
    country?: string;
  }
}
declare type AsyncPageProps = Promise<PageProps>;
interface FilterTags {
  year?: string;
  room?: string;
  genre?: string;
  country?: string;
}