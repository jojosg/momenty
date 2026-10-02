import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId?: string) {
  // 조회하려는 프로필(userId)이 지금 로그인한 나 자신의 프로필인지"**를 판단
  const session = useSession();
  const isMine = userId === session?.user.id;
  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        // 기본적으로는 그냥 프로필 조회
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        // PGRST116 = 조회 결과 row가 없음 (프로필이 아직 DB에 없는 상태)
        // 내 프로필이 없는 경우에만 자동으로 새로 생성 (남의 프로필이 없을 땐 그냥 에러 처리)
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    // userId가 없으면 쿼리 자체를 실행하지 않음
    enabled: !!userId,
  });
}
