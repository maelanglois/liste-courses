export interface ListI {
    id?: number,
    title?: string;
    elements: {
      oeufs: number;
      lait: number;
      eau: number;
      farine: number;
      beurre: number;
    };
    creation_date?: string,
  }