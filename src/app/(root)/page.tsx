import { rootTarget } from "@/lib/paths";

export default function RootPage() {
  return (
    <p style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <a href={rootTarget}>skills</a>
    </p>
  );
}
