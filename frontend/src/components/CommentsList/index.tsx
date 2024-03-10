import { ChangeEvent, useEffect } from "react";
import { Pagination, styled } from "@mui/material";
import CommentComponent, { ListStyled } from "../Comment";
import { useComments } from "@/contexts/CommentsContext";
import { CommentsListSkeleton } from "./CommentsListSkeleton";

export default function CommentsList() {
  const { getComments, updateParams, commentsList, params, loading } =
    useComments();

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    updateParams({ page });
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading || !commentsList.comments.length ? (
        <CommentsListSkeleton />
      ) : (
        <ListStyled>
          {commentsList.comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}></CommentComponent>
          ))}
        </ListStyled>
      )}
      <PaginationStyled
        count={commentsList.totalPages}
        variant="outlined"
        shape="rounded"
        page={params.page}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
    </>
  );
}

const PaginationStyled = styled(Pagination)(() => ({
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
}));
