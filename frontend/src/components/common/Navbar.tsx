"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

export const Navbar = () => {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
};

const NavbarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About", link: "/about" },
    { id: 3, name: "Products", link: "/products" },
    { id: 4, name: "Users", link: "/users" },
  ];

  return (
    <nav className="flex justify-between items-center p-5 bg-gray-100 shadow-sm mb-10">
      <div className="font-semibold text-sky-600">LOGO</div>

      <ul className="flex gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.link;
          return (
            <li key={item.id}>
              <Link
                className={isActive ? "border-b-2 border-b-blue-500" : ""}
                href={item.link}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        {session?.user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";

// export const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: session } = useSession(); // Get user session

//   const handleLogout = async () => {
//     await signOut({ redirect: false }); // Sign out user without auto redirection
//     router.push("/login"); // Redirect manually to login page
//   };

//   const navItems = [
//     { id: 1, name: "Home", link: "/" },
//     { id: 2, name: "About", link: "/about" },
//     { id: 3, name: "Products", link: "/products" },
//     { id: 4, name: "Users", link: "/users" },
//   ];
//   return (
//     <nav className="flex gap-40 m-10">
//       <div className="font-semibold text-sky-600">LOGO</div>

//       <ul className="flex gap-10">
//         {navItems.map((item) => {
//           const isActive = pathname === item.link;
//           return (
//             <li key={item.id}>
//               <Link
//                 className={isActive ? "border-b-2 border-b-blue-500" : ""}
//                 href={item.link}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//       {session?.user && (
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded-md"
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// };
