import Image from "next/image";

export default function LinkCard({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image?: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-gray-100 mb-3 max-w-3xl"
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {image && (
            <Image
              className="rounded-sm"
              alt={title}
              src={image}
              width={40}
              height={40}
            />
          )}
        </div>
        <h2 className="flex font-semibold w-full justify-center items-center text-gray-700 -ml-10">
          {title}
        </h2>
      </div>
    </a>
  );
}
