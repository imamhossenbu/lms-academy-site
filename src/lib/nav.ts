/** Main navigation of every academy site. */
export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/instructors", label: "Instructors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
