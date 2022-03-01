import { useCookie } from "next-cookie";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  const cookie = useCookie("token");

  return (
    <div className="container">
      <h1>Private Page</h1>
      <button onClick={() => {
        cookie.remove("token");
        router.replace("/");
      }}>
        Logout
      </button>
    </div>
  );
}
