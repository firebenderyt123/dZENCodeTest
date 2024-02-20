import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { CommentsState } from "@/lib/comments/comments.reducer";
import { GetCommentsProps } from "@/services/comments.service";
import CommentComponent, { ListStyled } from "../Comment";

interface Props {
  commentsState: CommentsState;
  getComments: (props: GetCommentsProps) => void;
}

export default function CommentsListComponent({
  commentsState,
  getComments,
}: Props) {
  const { pending, data, error } = commentsState;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    getComments({ page });
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

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
