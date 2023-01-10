import Image from "next/image";
import { Manrope } from "@next/font/google";
import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";
import { GitHubIcon } from "../components/icons/GitHubIcon";
import { TwitterIcon } from "../components/icons/TwitterIcon";
import LinkCard from "../components/LinkCard";
import { Data } from "../utils/types";
import Link from "next/link";

const manrop = Manrope();

export const dynamic = "force-dynamic",
  runtime = "edge";

export default async function HomePage() {
  // const [] = await Promise.all([
  //   get("linktree"), // dynamic
  //   fetch("https://...", { cache: "force-cache" }), // static
  //   fetch("https://", {
  //     // ISR
  //     next: { revalidate: 10 },
  //   }),
  // ]);

  const data: Data | undefined = await get("linktree");

  if (!data) {
    redirect("https://linktr.ee/prodmxle");
  }

  return (
    <div
      className={`flex flex-col items-center justify-center mx-auto w-full mt-16 px-8 ${manrop.className}`}
    >
      <Image
        className="rounded-full select-none"
        alt={data.name}
        src={data.avatar}
        width={96}
        height={96}
        draggable="false"
      />
      <h1 className="font-bold mt-4 text-xl mb-8">{data.name}</h1>
      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex items-center gap-4 mt-8">
        {data.socials.map((social) => {
          if (social.href.includes("twitter")) {
            return (
              <Link
                target="_blank"
                rel="noreferrer"
                key={social.href}
                href={social.href}
              >
                <TwitterIcon />
              </Link>
            );
          }
          if (social.href.includes("github")) {
            return (
              <Link
                target="_blank"
                rel="noreferrer"
                key={social.href}
                href={social.href}
              >
                <GitHubIcon key={social.href} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
