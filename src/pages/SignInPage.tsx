import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useSignInWithOAuth } from "@/hooks/mutations/useSignInWithOAuth";
import { useSignInWithPassword } from "@/hooks/mutations/useSignInWithPassword";
import { Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignInWithPassword();
  const { mutate: signInWithOAuth } = useSignInWithOAuth();
  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };
  const handleSignInWithGithubClick = () => {
    signInWithOAuth("github");
  };

  return (
    <form className="flex flex-1">
      <div className="flex flex-1 items-center justify-center py-6">
        <div className="flex w-full max-w-[568px] flex-col items-center justify-center gap-4 rounded-2xl bg-white px-6 py-8 sm:gap-6 sm:rounded-3xl sm:px-14 sm:py-10">
          <div className="text-xl font-bold">로그인</div>
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
          </div>
          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={handleSignInWithPasswordClick}
              type="submit"
              className="w-full cursor-pointer text-lg"
            >
              로그인
            </Button>
            <Button
              onClick={handleSignInWithGithubClick}
              type="button"
              variant="outline"
              className="w-full cursor-pointer text-lg"
            >
              <Github size={24} />
              Github로 로그인
            </Button>
          </div>

          <div>
            <span className="text-gray-500">계정이 없으시다면?</span>
            <Link to={"/sign-up"} className="ml-2 text-green-600 underline">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
