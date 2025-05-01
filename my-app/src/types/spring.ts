export interface Spring {
  _id: string;
  id: number;
  name: string;
  slug: string;
  location: {
    _type: 'geopoint';
    lat: number;
    lng: number;
  };
  waterType: string;
  accessibility: string;
}
