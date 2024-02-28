export interface CommentsGetRequestProps {
  page: number;
  limit: number;
  orderBy: "username" | "email" | "createdAt";
  order: "ASC" | "DESC";
}
