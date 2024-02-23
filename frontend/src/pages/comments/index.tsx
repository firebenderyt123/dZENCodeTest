import Head from "next/head";
import { useEffect } from "react";
import CommentsList from "@/components/CommentsList";
import CommentBox from "@/components/CommentBox";
import { useComments } from "@/hooks/useComments";

export default function CommentsPage() {
  const {
    commentsState,
    commentDraftState,
    createComment,
    getComments,
    onCommentPublished,
    offCommentPublished,
  } = useComments();

  useEffect(() => {
    if (!commentsState.data && !commentsState.error) getComments({});
  }, [commentsState, getComments]);

  useEffect(() => {
    onCommentPublished();

    return () => {
      offCommentPublished();
    };
  }, [offCommentPublished, onCommentPublished]);

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
      <CommentBox
        commentDraftState={commentDraftState}
        onSubmitHandler={createComment}
      />
      <CommentsList
        commentsState={commentsState}
        getComments={getComments}></CommentsList>
    </>
  );
}
