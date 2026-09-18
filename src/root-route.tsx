import { Navigate, Route, Routes } from "react-router";
import SigninPage from "./pages/SignInPage";
import SignupPage from "./pages/SignUpPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import IndexPage from "./pages/IndexPage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import GlobalLayout from "./layout/GlobalLayout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/" element={<IndexPage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/profile/:userId" element={<ProfileDetailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
