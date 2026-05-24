import type { CSSProperties, ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";

export type HeadCell<T = unknown> = {
  id: string;
  label: string;
  align?: string;
  width?: string | number;
  renderHeader?: () => ReactNode;
  renderCell?: (row: T) => ReactNode;
};

export type TableAction<T> = {
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  sx?: SxProps<Theme>;
  hide?: (row: T) => boolean;
};

export type CustomRender<T> = {
  [key in keyof T]?: (row: T) => React.ReactNode;
};

export interface SimpleTableProps<T extends { id: string | number }> {
  data: T[];
  headCells: HeadCell<T>[];
  actions?: TableAction<T>[];
  customRender?: CustomRender<T>;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}
