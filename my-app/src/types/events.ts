export interface Spring {
  _id: string;
  name: string;
  // Add other properties as needed
}

export interface ImageObject {
  file: {
    asset: {
      _ref: string;
      _type: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  caption?: string;
}

export interface Event {
  title: string;
  id?: number;
  date?: string; // ISO date string from datetime
  springs?: Spring[];
  description?: string;
  images?: ImageObject[];
}


