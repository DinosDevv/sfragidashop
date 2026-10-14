import Icon, { type IconName } from "@/components/Icon";

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Εγγύηση ποιότητας", text: "Υλικά υψηλής αντοχής και άψογο φινίρισμα σε κάθε παραγγελία." },
  { icon: "truck", title: "Γρήγορη παράδοση", text: "Αποστολή σε 1–3 εργάσιμες σε όλη την Ελλάδα." },
  { icon: "pencil", title: "Εξατομικευμένος σχεδιασμός", text: "Σχεδιάζουμε μαζί σας ακριβώς ό,τι χρειάζεστε." },
  { icon: "phone", title: "Άμεση εξυπηρέτηση", text: "Είμαστε δίπλα σας πριν και μετά την αγορά." },
];

export default function WhyUs() {
  return (
    <section className="bg-gray-900 py-12 text-white md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">Γιατί να μας επιλέξετε</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Icon name={r.icon} className="h-7 w-7" />
              </div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
