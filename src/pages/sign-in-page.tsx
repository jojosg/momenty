import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import { Link } from "react-router";

export default function SigninPage() {
  return (
    <form className="flex flex-1">
      <div className="flex flex-1 items-center justify-center py-6">
        <div className="flex w-full max-w-[568px] flex-col items-center justify-center gap-6 rounded-3xl bg-white px-14 py-10">
          <div className="text-xl font-bold">로그인</div>
          <div className="flex w-full flex-col gap-4">
            <Field>
              <FieldLabel>
                아이디<span className="required">*</span>
              </FieldLabel>
              <Input
                className="w-full"
                type="email"
                placeholder="이메일을 입력해주세요"
              />
            </Field>

            <Field>
              <FieldLabel>
                비밀번호<span className="required">*</span>
              </FieldLabel>
              <Input type="password" placeholder="비밀번호를 입력해주세요" />
            </Field>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer text-lg">
              로그인
            </Button>
            <Button
              type="button"
              variant="secondary"
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
