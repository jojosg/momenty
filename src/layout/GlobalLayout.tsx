import { Link, Outlet } from "react-router";
import momenty from "@/assets/momenty.png";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col bg-gray-50">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-320 justify-between px-4">
          <div className="flex items-center">
            <Link to={"/"}>
              <img src={momenty} className="-ml-2 h-auto w-36 sm:w-56" alt="모멘티" />
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img src={defaultAvatar} className="h-6" />
          </div>
        </div>
      </header>
      <main className="m-auto flex w-full max-w-320 flex-1 flex-col px-4">
        {/* page 컴포넌트가 들어갈 곳 */}
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @komeup
      </footer>
    </div>
  );
}
