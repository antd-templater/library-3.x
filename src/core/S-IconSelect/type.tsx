export type SIconSelectOption = {
  label: string | number;
  value: string | number;
  options?: Omit<SIconSelectOption, 'options'>[];
  disabled?: boolean;
  [name: string]: any;
}
