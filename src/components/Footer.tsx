import Link from "next/link";
import { categories } from "@/lib/categories";
import { siteInfo } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-gray-600">{siteInfo.tagline}</p>
        </div>

        <div>
          <h3 className="font-semibold">Επικοινωνία</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>
              Τηλ.: <a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`} className="hover:underline">{siteInfo.phone}</a>
            </li>
            <li>
              Email: <a href={`mailto:${siteInfo.email}`} className="hover:underline">{siteInfo.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Φυσικό κατάστημα</h3>
          <address className="mt-4 text-sm not-italic text-gray-600">
            {siteInfo.address.street}
            <br />
            {siteInfo.address.city}
          </address>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {siteInfo.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} className="hover:underline">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t px-4 py-4 text-center text-sm text-gray-500">
        © {siteInfo.name}. Με επιφύλαξη παντός δικαιώματος.
      </p>
    </footer>
  );
}
