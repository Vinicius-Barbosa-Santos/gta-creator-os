import { redirect } from "next/navigation";
import { beginnerCoursePath } from "../site";

export default function Demo() {
  redirect(beginnerCoursePath);
}
