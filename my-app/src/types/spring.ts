import { Event } from './events';

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
    municipality: string;
    note: string;
    ownership: {
      _type: 'object';
      id: number;
      shorterOption: string;
      longerOption: string;
    }
    images: any[];
    access: string;
    properties: string[];
    treatment: string[];
    events: Event[];
    // ... any other fields you need
  };
  

