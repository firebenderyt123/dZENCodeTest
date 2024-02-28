import { FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { Box, Option, Select, styled } from "@mui/joy";

type OptionType = {
  label: string;
  value: string;
};
export type SelectChangeEvent = MouseEvent | KeyboardEvent | FocusEvent | null;

interface ListOrderPanelProps {
  defaultValueItemsPerPage: string;
  defaultValueOrderBy: string;
  optionsItemsPerPage: OptionType[];
  optionsOrderBy: OptionType[];
  onChangeItemsPerPage: (value: string) => void;
  onChangeOrderBy: (value: string) => void;
}
export default function ListOrderPanel({
  defaultValueItemsPerPage,
  defaultValueOrderBy,
  optionsItemsPerPage,
  optionsOrderBy,
  onChangeItemsPerPage,
  onChangeOrderBy,
}: ListOrderPanelProps) {
  return (
    <BoxStyled>
      <Select
        placeholder="Items per page"
        onChange={(_, value) => onChangeItemsPerPage(value as string)}
        defaultValue={defaultValueItemsPerPage}>
        <Options options={optionsItemsPerPage} />
      </Select>
      <Select
        placeholder="Order by"
        onChange={(_, value) => onChangeOrderBy(value as string)}
        defaultValue={defaultValueOrderBy}>
        <Options options={optionsOrderBy} />
      </Select>
    </BoxStyled>
  );
}

interface OptionsParams {
  options: OptionType[];
}
const Options = ({ options }: OptionsParams) => {
  return options.map(({ label, value }, index) => (
    <Option key={index} value={value}>
      {label}
    </Option>
  ));
};

const BoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
