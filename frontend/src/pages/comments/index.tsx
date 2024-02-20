import Head from "next/head";
import { useCallback, useEffect } from "react";
import MainComponent from "@/components/Main";
import CommentsListComponent from "@/components/CommentsList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import commentsService, { GetCommentsProps } from "@/services/comments.service";

export default function CommentsPage() {
  const dispatch = useAppDispatch();
  const commentsState = useAppSelector((comments) => comments.comments);

  const handleGetComments = useCallback(
    (props: GetCommentsProps) => {
      dispatch(commentsService.getComments(props));
    },
    [dispatch]
  );

  useEffect(() => {
    handleGetComments({});
  }, [handleGetComments]);

  return (
    <>
      <Head>
        <title>dZENCode Test Task</title>
        <meta
          name="description"
          content="It's a test task from dZENCode company"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainComponent>
        <CommentsListComponent
          commentsState={commentsState}
          getComments={handleGetComments}></CommentsListComponent>
      </MainComponent>
    </>
  );
}