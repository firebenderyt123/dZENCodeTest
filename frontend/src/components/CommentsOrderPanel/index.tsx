import { useCallback } from "react";
import ListOrderPanel from "../ListOrderPanel";
import { useComments } from "@/contexts/CommentsContext";

export default function CommentOrderPanel() {
  const { updateParams } = useComments();

  const onChangeItemsPerPage = useCallback(
    (value: string) => {
      updateParams({ limit: +value });
    },
    [updateParams]
  );

  const onChangeOrderBy = useCallback(
    (value: string) => {
      const [orderBy, order] = value.split("_");
      if (
        (orderBy === "username" ||
          orderBy === "email" ||
          orderBy === "createdAt") &&
        (order === "ASC" || order === "DESC")
      )
        updateParams({ orderBy, order });
    },
    [updateParams]
  );

  return (
    <ListOrderPanel
      defaultValueItemsPerPage="25"
      defaultValueOrderBy="createdAt_DESC"
      optionsItemsPerPage={itemsPerPageOptions}
      optionsOrderBy={orderByOptions}
      onChangeItemsPerPage={onChangeItemsPerPage}
      onChangeOrderBy={onChangeOrderBy}
    />
  );
}

const itemsPerPageOptions = [
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];
const orderByOptions = [
  { label: "E-mail (A-Z)", value: "email_ASC" },
  { label: "E-mail (Z-A)", value: "email_DESC" },
  { label: "Username (A-Z)", value: "username_ASC" },
  { label: "Username (Z-A)", value: "username_DESC" },
  { label: "Date (New First)", value: "createdAt_DESC" },
  { label: "Date (Old First)", value: "createdAt_ASC" },
];
