import { Offer } from './offer';

export const MOCK_OFFERS: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great loaction',
    type: 'Apartment',
    bedrooms: 3,
    adults: 4,
    children: 0,
    price: 120,
    rate: 4.8,
    features: ['Apartment', '3 bedrooms', 'Max 4 adults'],
    inside: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Towels',
      'Baby seat',
      'Cabel TV',
    ],
    description: `
      A quiet cozy and picturesque
      that hides behind a a river by
      the unique lightness of Amsterdam.
      The building is green and from 18th century.

      An independent House, strategically
      located between Rembrand Square and National
      Opera, but where the bustle of the city
      comes to rest in this alley flowery and colorful.
    `,
    isPremium: true,
    isFavorite: false,
    host: 1,
    reviews: [1],
    pictures: ['img/apartment-01.jpg', 'img/room.jpg'],
    pictureSmall: 'img/apartment-small-04.jpg',
    city: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.85309666406198,
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'Apartment',
    bedrooms: 2,
    adults: 2,
    children: 1,
    price: 80,
    rate: 5.0,
    features: ['Apartment', '2 bedrooms', 'Max 3 adults'],
    inside: ['Wi-Fi', 'Heating', 'Kitchen', 'Towels', 'Baby seat', 'Cabel TV'],
    description: `
      An independent House, strategically
      located between Rembrand Square and National
      Opera, but where the bustle of the city
      comes to rest in this alley flowery and colorful.
    `,
    isPremium: false,
    isFavorite: true,
    host: 3,
    reviews: [4, 5],
    pictures: ['img/apartment-02.jpg', 'img/studio-01.jpg'],
    pictureSmall: 'img/apartment-small-03.jpg',
    city: 'Amsterdam',
    lat: 52.3609553943508,
    lng: 4.85309666406198,
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'Private room',
    bedrooms: 1,
    adults: 2,
    children: 0,
    price: 132,
    rate: 4.0,
    features: ['Apartment', '1 bedroom', 'Max 2 adults'],
    inside: ['Wi-Fi', 'Heating', 'Towels', 'Cabel TV'],
    description: `
    A quiet cozy and picturesque
    that hides behind a a river by
    the unique lightness of Amsterdam.
    The building is green and from 18th century.
    `,
    isPremium: false,
    isFavorite: false,
    host: 5,
    reviews: [2, 3],
    pictures: ['img/apartment-03.jpg', 'img/room.jpg', 'img/studio-01.jpg'],
    pictureSmall: 'img/apartment-small-03.jpg',
    city: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.929309666406198,
  },
  {
    id: 4,
    title: 'Nice cozy warm apartment',
    type: 'Apartment',
    bedrooms: 2,
    adults: 3,
    children: 2,
    price: 180,
    rate: 5.0,
    features: ['Apartment', '1 bedrooms', 'Max 2 adults'],
    inside: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Towels',
      'Baby seat',
      'Cabel TV',
    ],
    description: `
    A quiet cozy and picturesque apartment from 15th century.
    `,
    isPremium: true,
    isFavorite: true,
    host: 7,
    reviews: [],
    pictures: ['img/apartment-01.jpg', 'img/studio-01.jpg', 'img/room.jpg'],
    pictureSmall: 'img/apartment-small-04.jpg',
    city: 'Amsterdam',
    lat: 52.3809553943508,
    lng: 4.939309666406198,
  },
];
