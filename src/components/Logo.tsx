import { siteInfo } from "@/lib/site";

// Placeholder — swap for <Image src="/logo.svg" ... /> once the logo is ready.
export default function Logo() {
  return (
    <div className="flex h-10 w-28 items-center justify-center rounded border-2 border-dashed border-gray-300 text-xs font-medium text-gray-400">
      LOGO
      <span className="sr-only">{siteInfo.name}</span>
    </div>
  );
}
