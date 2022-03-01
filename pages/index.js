import { useRouter } from "next/router";
import { useState } from "react";
import { useCookie } from "next-cookie";
import Link from "next/link";

export default function () {
  const [value, setValue] = useState("");
  const router = useRouter();
  const cookie = useCookie('token');

  return (
    <div className="container">
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/api/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.success) {
                cookie.set("token", res.data.username);
                router.replace("/private");
              }
            });
        }}
      >
        <input
          type="text"
          value={value}
          placeholder={"Type something to set as cookie"}
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
        <input type="submit" value="Sign in" />
      </form>
      <Link href="/public">
        <a>Go to public page</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = useCookie(ctx);
  if (cookie.get("token")) {
    ctx.res.writeHead(302, {
      Location: "/private",
    });
    ctx.res.end();
  }
  return {
    props: {},
  }
}
