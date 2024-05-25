export type DropdownType = {
  label: string;
  onClick: () => void;
}

export type CategoryListType = {
  category: string;
  country: string;
  age: string;
  interest: string;
}

export type ProfileType = {
  id: string;
  connectionStatus?: string;
  name: string;
  overallRating: string;
  shortInfoList: Array<string>;
  shortDescription: string;
};
