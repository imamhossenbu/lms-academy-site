import { redirect } from "next/navigation";

/** Old address → the dashboard's My courses tab. */
export default function MyCoursesRedirect() {
  redirect("/dashboard?tab=courses");
}
