export interface CultureInfo {
  category: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProvinceData {
  id: string;               // e.g. "aceh"
  name: string;             // e.g. "Aceh"
  island: string;           // e.g. "sumatera"
  capital: string;          // e.g. "Banda Aceh"
  region: string;           // e.g. "Sumatera"
  description: string;
  heroImage: string;
  culture: CultureInfo[];
  facts: {
    population: string;
    area: string;
    uniqueFact: string;
    established: string;
  };
  geography: {
    type: "coastal" | "inland" | "island";
    landmarks: string[];
  };
}
