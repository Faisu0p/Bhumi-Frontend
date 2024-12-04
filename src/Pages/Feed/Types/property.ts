export interface PropertyListing {
    id: string;
    status: {
      sell?: boolean;
      flat?: boolean;
      urgent?: boolean;
    };
    images: string[];
    name: string;
    poster: {
      name: string;
      company: string;
      avatar: string;
    };
    details: {
      type: string;
      area: {
        size: number;
        unit: string;
      };
      price: {
        amount: number;
        perSqft: number;
      };
    };
    features: {
      beds: number;
      baths: number;
      parking: number;
    };
    tags: string[];
    location: string;
    listingCount: number;
  }
  
  