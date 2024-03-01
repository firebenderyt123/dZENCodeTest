export interface GetCommentsProps {
  page: number;
  limit: number;
  orderBy: "username" | "email" | "createdAt";
  order: "ASC" | "DESC";
}
