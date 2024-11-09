export interface CrosswordSquaresData {
  count: number;
  mainIndex: number;
  description: string;
}

export const isCrosswordWithDescription = (
  data: CrosswordSquaresData[] | Omit<CrosswordSquaresData, 'description'>[],
): data is CrosswordSquaresData[] => {
  return 'description' in data[0];
};
