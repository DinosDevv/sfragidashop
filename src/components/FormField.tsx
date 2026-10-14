type Props = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
};

const inputClass = "mt-1 w-full rounded border px-3 py-2 focus:border-black focus:outline-none";

export default function FormField({ label, name, type = "text", required, autoComplete, multiline, className = "" }: Props) {
  return (
    <label className={`block text-sm font-medium ${className}`}>
      {label}
      {required && <span className="text-red-600"> *</span>}
      {multiline ? (
        <textarea name={name} required={required} rows={4} className={inputClass} />
      ) : (
        <input name={name} type={type} required={required} autoComplete={autoComplete} className={inputClass} />
      )}
    </label>
  );
}
