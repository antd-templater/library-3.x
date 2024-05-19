export type SIconSelectOption = {
  label: string | number;
  value: string | number;
  disabled?: boolean;
  options?: Array<{
    label: string | number;
    value: string | number;
    disabled?: boolean;
  }>;
}
