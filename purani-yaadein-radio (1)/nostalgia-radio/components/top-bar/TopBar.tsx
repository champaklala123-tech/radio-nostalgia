import { Clock } from "./Clock";
import { ListenerCount } from "./ListenerCount";
import { SocialLinks } from "./SocialLinks";

export function TopBar() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-10 flex items-start justify-between px-[max(1rem,env(safe-area-inset-left))] pt-[max(1rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))]"
    >
      <Clock />
      <div className="absolute left-1/2 top-[max(1rem,env(safe-area-inset-top))] -translate-x-1/2">
        <ListenerCount />
      </div>
      <SocialLinks />
    </div>
  );
}
