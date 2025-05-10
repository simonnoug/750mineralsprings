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
    region: string;
    ownership: string;
    access: string;
    properties: string[];
    treatment: string[];
    // ... any other fields you need
  };
  

