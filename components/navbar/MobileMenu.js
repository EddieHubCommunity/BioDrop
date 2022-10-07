import { useRouter } from "next/router";
import { appRoutes } from "./data";
import NavLink from "./NavLink";
import { Version } from "./Version";

export const MobileMenu = () => {
  const router = useRouter();

  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {appRoutes.map((item, index) => (
          <NavLink key={index} path={router.asPath} item={item} mode="mobile" />
        ))}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-700">
        <Version />
      </div>
    </div>
  );
};
