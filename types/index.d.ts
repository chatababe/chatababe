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
    page?:string
  }>
 }

interface FilterTags {
  year?: string;
  room?: string;
  genre?: string;
  country?: string;
}
type User = {
  id: string;
  username: string;
  imageUrl: string;
  profile: {
    age: number;
  } | null;
};
interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
    goalText: string | null;
    type: string | null;
    tags: string[] | null;
  };
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
type ProfileImages = {
  profile_image: string;
  thumbnail_image_small: string;
  thumbnail_image_medium: string;
  thumbnail_image_big: string;
};

type LiveImages = {
  thumbnail_image_medium: string;
  thumbnail_image_big: string;
};

type Tags = {
  [key: string]: string;
};

declare type UserSeedProfile = {
  username: string;
  profile_page_url: string;
  display_name: string;
  display_age: string;
  profile_images: ProfileImages;
  live_images: LiveImages;
  chat_url: string;
  chat_url_on_home_page: string;
  direct_chat_url: string;
  stream_feed_url: string;
  online_time: number;
  members_count: number;
  is_vibratoy: boolean;
  is_hd: boolean;
  social_networks: string[]; // Array of social network names
  gender: string;
  hometown: string;
  homecountry: string;
  sexual_preference: string;
  turns_on: string;
  turns_off: string;
  last_online_date: string; // ISO date string
  region: string;
  seven_days_live_time: number;
  thirty_days_live_time: number;
  height: string;
  weight: string;
  ethnicity: string;
  hair_color: string;
  eye_color: string;
  bust_size: string;
  butt_size: string;
  pubic_hair: string;
  primary_language: string;
  secondary_language: string;
  tags: Tags;
};
declare type seedData ={
  models: UserSeedProfile[]
}
