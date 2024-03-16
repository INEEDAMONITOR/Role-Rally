import { Role, User } from "@/app/types";
import { CurrentRole } from "./CurrentRole";
export function DetailBar({
  role,
  setViewProfile,
  viewProfile,
}: {
  role: Role;
  setViewProfile: (view: boolean) => void;
  viewProfile: Boolean;
}) {
  return (
    /* flex-1 有点问题 最好放在component外*/
    <div className="flex-1 bg-gray-700 flex flex-col justify-between">
      <div>RoleDetails {role._id}</div>
      <CurrentRole
        role={role}
        setViewProfile={setViewProfile}
        viewProfile={viewProfile}
      />
    </div>
    /* This will go at the bottom */
  );
}

export default DetailBar;
