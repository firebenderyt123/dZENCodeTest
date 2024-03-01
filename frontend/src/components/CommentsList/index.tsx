import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { CommentsState } from "@/lib/slices/comments.slice";
import { GetCommentsProps } from "@/services/comments.service";
import CommentComponent, { ListStyled } from "../Comment";

interface CommentsListProps {
  commentsState: CommentsState;
  getComments: (props: Partial<GetCommentsProps>) => void;
}

export default function CommentsList({
  commentsState,
  getComments,
}: CommentsListProps) {
  const { pending, comments, total, error, params } = commentsState;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    getComments({ page });
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    comments && (
      <>
        <ListStyled>
          {comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}></CommentComponent>
          ))}
        </ListStyled>
        <Pagination
          count={total.pages}
          variant="outlined"
          shape="rounded"
          page={params.page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </>
    )
  );
}
