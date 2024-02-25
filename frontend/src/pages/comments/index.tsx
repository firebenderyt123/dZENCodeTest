import Head from "next/head";
import CommentsPageContent from "@/components/PageContents/CommentsPageContent";
import CommentsProvider from "@/contexts/CommentsContext";
import CommentFormProvider from "@/contexts/CommentFormContext";
import UserProvider from "@/contexts/UserContext";

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
      <UserProvider>
        <CommentsProvider>
          <CommentFormProvider>
            <CommentsPageContent />
          </CommentFormProvider>
        </CommentsProvider>
      </UserProvider>
    </>
  );
}
