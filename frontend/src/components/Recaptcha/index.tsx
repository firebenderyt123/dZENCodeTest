export { ReCAPTCHA } from "react-google-recaptcha";
import { ForwardedRef, forwardRef } from "react";
import Captcha from "react-google-recaptcha";

interface RecaptchaProps {}

function Recaptcha(props: RecaptchaProps, ref: ForwardedRef<Captcha>) {
  return (
    process.env.NODE_ENV !== "production" && (
      <Captcha
        {...props}
        sitekey={process.env.googleRecaptchaPublicKey || " "}
        ref={ref}
      />
    )
  );
}
export default forwardRef(Recaptcha);
