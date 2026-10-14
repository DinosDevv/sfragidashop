import type { Metadata } from "next";
import Icon, { type IconName } from "@/components/Icon";
import FormField from "@/components/FormField";
import { siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: `Επικοινωνία | ${siteInfo.name}`,
};

const details: { icon: IconName; title: string; lines: string[]; href?: string }[] = [
  { icon: "phone", title: "Τηλέφωνο", lines: [siteInfo.phone], href: `tel:${siteInfo.phone.replace(/\s/g, "")}` },
  { icon: "mail", title: "Email", lines: [siteInfo.email], href: `mailto:${siteInfo.email}` },
  { icon: "mapPin", title: "Φυσικό κατάστημα", lines: [siteInfo.address.street, siteInfo.address.city] },
  { icon: "clock", title: "Ωράριο", lines: siteInfo.hours },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Επικοινωνία</h1>
      <p className="mt-2 text-gray-600">Έχετε ερώτηση ή θέλετε προσφορά για κάτι εξατομικευμένο; Στείλτε μας μήνυμα.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((d) => (
            <div key={d.title} className="rounded-lg border p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Icon name={d.icon} className="h-5 w-5" />
              </div>
              <h2 className="font-semibold">{d.title}</h2>
              <div className="mt-1 text-sm text-gray-600">
                {d.lines.map((line) =>
                  d.href ? (
                    <a key={line} href={d.href} className="block hover:underline">{line}</a>
                  ) : (
                    <p key={line}>{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
          {/* Placeholder — replace with an embedded map of the store. */}
          <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 sm:col-span-2">
            Χάρτης
          </div>
        </div>

        <form className="space-y-4 rounded-lg border p-4 sm:p-6">
          <h2 className="text-lg font-semibold">Στείλτε μας μήνυμα</h2>
          <FormField label="Ονοματεπώνυμο" name="name" autoComplete="name" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Email" name="email" type="email" autoComplete="email" required />
            <FormField label="Τηλέφωνο" name="phone" type="tel" autoComplete="tel" />
          </div>
          <FormField label="Μήνυμα" name="message" multiline required />
          <button type="submit" disabled className="w-full rounded bg-black px-6 py-3 font-medium text-white disabled:opacity-60 sm:w-auto">
            Αποστολή (σύντομα)
          </button>
        </form>
      </div>
    </div>
  );
}
