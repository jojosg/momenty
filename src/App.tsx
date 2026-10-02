import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import RootRoute from "./root-route";
import { useIsSessionLoaded, useSession, useSetSession } from "./store/session";
import GlobalLoader from "./components/GlobalLoader";
import { useProfileData } from "./hooks/queries/useProfileData";
import ModalProvider from "./provider/ModalProvider";

export default function App() {
  // 현재 로그인 세션, 세션 저장 함수, 세션 확인 완료 여부를 스토어에서 가져옴
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  // 로그인한 유저의 프로필 조회
  // session이 아직 없으면(userId가 undefined) enabled: false라 쿼리 자체가 실행 안 됨
  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );
  // 앱이 처음 렌더링될 때 한 번, Supabase 인증 상태 변화 리스너를 등록
  // 로그인/로그아웃/토큰 갱신 등이 일어날 때마다 콜백이 실행되어 스토어를 최신 상태로 갱신함
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);
  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;
  return (
    <div>
      {/* 이 컴포넌트 아래 있는 모든 자식들에게 모달을 열 수 있는 능력을 제공(provide)한다 */}
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </div>
  );
}
