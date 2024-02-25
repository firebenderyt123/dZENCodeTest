import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateCommentSchema,
  createCommentSchema,
} from "@/schemas/create-comment.shema";
import { CreateCommentProps } from "@/services/comments.service";
import {
  ChangeUserInfoSchema,
  changeUserInfoSchema,
} from "@/schemas/change-user-info.schema";
import CommentBox from "../CommentBox";
import UserInfo from "../UserInfo";
import { useUser } from "@/contexts/UserContext";
import { useCommentForm } from "@/contexts/CommentFormContext";

export default function CommentCreateForm() {
  const commentForm = useCommentForm();
  const user = useUser();

  const commentBoxForm = useForm<CreateCommentSchema>({
    mode: "onChange",
    resolver: yupResolver(createCommentSchema),
  });
  const changeUserForm = useForm({
    mode: "onChange",
    resolver: yupResolver<ChangeUserInfoSchema>(changeUserInfoSchema),
  });

  const commentFormSubmit = (data: CreateCommentProps, captcha: string) => {
    changeUserForm.trigger().then((isValid) => {
      if (!isValid) return;

      const userData = changeUserForm.getValues();
      user?.updateUserInfo(userData);
      commentForm?.createComment(data, captcha);
    });
  };

  return (
    <div>
      <UserInfo form={changeUserForm} />
      <CommentBox form={commentBoxForm} submitCallback={commentFormSubmit} />
    </div>
  );
}
