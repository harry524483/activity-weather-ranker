export type LocationOption = {
  value: { latitude: number; longitude: number };
  label: string;
};

export type CallbackFn = (options: LocationOption[]) => void;
