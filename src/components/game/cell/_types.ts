export interface ICell {
  coordinate: number;
  isRival?: boolean;
}

export type TDnDHandler = (event: React.DragEvent<HTMLDivElement>) => void;
