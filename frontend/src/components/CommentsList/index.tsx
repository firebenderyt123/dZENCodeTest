import { ChangeEvent } from "react";
import { Pagination } from "@mui/material";
import CommentComponent, { ListStyled } from "../Comment";
import { useComments } from "@/contexts/CommentsContext";

export default function CommentsList() {
  const { updateParams, commentsList, params } = useComments();

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    updateParams({ page });
  };

  return (
    <>
      <ListStyled>
        {commentsList.comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}></CommentComponent>
        ))}
      </ListStyled>
      <Pagination
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
