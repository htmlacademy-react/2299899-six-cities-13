export type Offer = {
  id: number;
  title: string;
  type: string;
  bedrooms: number;
  adults: number;
  children: number;
  price: number;
  rate: number;
  services: string[];
  description: string;
  isPremium: boolean;
  isFavorite: boolean;
  host: number;
  reviews: number[];
  picture: string;
  pictureSmall: string;
  city: string;
};
