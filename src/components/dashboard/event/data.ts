export type optionType = {
  value: string;
  label: string;
};

export const optionsType: optionType[] = [
  { value: "Wedding", label: "Wedding" },
  { value: "Kids Show", label: "Kids Show" },
  { value: "Church Show", label: "Church Show" },
  { value: "Adult Show", label: "Adult Show" },
  { value: "All Ages", label: "All Ages" },
  { value: "Educational", label: "Educational" },
  { value: "Entertainment", label: "Entertainment" },
];

export const optionsAuthType: optionType[] = [
  { value: "barcode", label: "barcode" },
  { value: "pincode", label: "pincode" },
];
