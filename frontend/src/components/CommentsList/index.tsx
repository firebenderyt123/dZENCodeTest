import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import CommentComponent, { ListStyled } from "../Comment";
import { useComments } from "@/contexts/CommentsContext";

export default function CommentsList() {
  const { getComments, commentsList, params } = useComments();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getComments({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    getComments({ page });
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [commentsList]);

  return (
    commentsList && (
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
    )
  );
}
