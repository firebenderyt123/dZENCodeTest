import Head from "next/head";
import MainComponent from "@/components/Main";
import CommentsListComponent from "@/components/CommentsList";
import { comments } from "./comments";

export default function CommentsPage() {
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
          comments={comments}
          totalPages={2}></CommentsListComponent>
      </MainComponent>
    </>
  );
}
