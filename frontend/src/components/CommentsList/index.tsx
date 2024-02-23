import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { CommentsState } from "@/lib/slices/comments.slice";
import { GetCommentsProps } from "@/services/comments.service";
import CommentComponent, { ListStyled } from "../Comment";

interface CommentsListProps {
  commentsState: CommentsState;
  getComments: (props: GetCommentsProps) => void;
}

export default function CommentsList({
  commentsState,
  getComments,
}: CommentsListProps) {
  const { pending, data, error } = commentsState;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    getComments({ page });
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
