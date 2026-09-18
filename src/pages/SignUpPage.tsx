import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useSignUp } from "@/hooks/mutations/useSignUp";
import { useState } from "react";
import { Link } from "react-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp } = useSignUp();

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({
      email,
      password,
    });
  };
  return (
    <form noValidate className="flex flex-1">
      <div className="flex flex-1 items-center justify-center py-6">
        <div className="flex w-full max-w-[568px] flex-col items-center justify-center gap-4 rounded-2xl bg-white px-6 py-8 sm:gap-6 sm:rounded-3xl sm:px-14 sm:py-10">
          <div className="text-xl font-bold">회원가입</div>
          <div className="flex w-full flex-col gap-4">
            <Field>
              <FieldLabel>
                아이디<span className="required">*</span>
              </FieldLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                type="email"
                placeholder="이메일을 입력해주세요"
              />
            </Field>

            <Field>
              <FieldLabel>
                비밀번호<span className="required">*</span>
              </FieldLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </Field>

            <Field>
              <FieldLabel>
                비밀번호 확인<span className="required">*</span>
              </FieldLabel>
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
              />
            </Field>
          </div>
          <div className="w-full">
            <Button
              onClick={handleSignUpClick}
              type="submit"
              className="w-full cursor-pointer text-lg"
            >
              회원가입
            </Button>
          </div>
          <div>
            <span className="text-gray-500">이미 회원이신가요?</span>
            <Link to={"/sign-in"} className="ml-2 text-green-600 underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
