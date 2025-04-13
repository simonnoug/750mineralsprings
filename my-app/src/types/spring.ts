export interface Spring {
  _id: string;
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
