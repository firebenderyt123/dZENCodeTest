import { ChangeEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { Comment } from "../Comment/comment.interface";
import CommentComponent, { ListStyled } from "../Comment";

interface Props {
  comments: Comment[];
  totalPages: number;
}

export default function CommentsListComponent({ comments, totalPages }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ListStyled>
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}></CommentComponent>
        ))}
      </ListStyled>
      <Pagination
        count={totalPages}
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
