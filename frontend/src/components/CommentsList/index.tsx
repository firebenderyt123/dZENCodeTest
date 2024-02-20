import { ChangeEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { CommentsState } from "@/lib/comments/comments.reducer";
import CommentComponent, { ListStyled } from "../Comment";

interface Props {
  commentsState: CommentsState;
}

export default function CommentsListComponent({ commentsState }: Props) {
  const { pending, data, error } = commentsState;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ListStyled>
        {data?.comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}></CommentComponent>
        ))}
      </ListStyled>
      <Pagination
        count={data?.total.pages || currentPage}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
    </>
  );
}
