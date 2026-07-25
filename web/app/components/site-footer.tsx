import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={18}
            height={18}
            className="rounded-full opacity-80"
          />
          <p>&copy; {new Date().getFullYear()} HeyJarvis. En fase de validación privada.</p>
        </div>
        <a
          href="https://github.com/maumtzbo-byte/HeyJarvis"
          className="transition-colors hover:text-foreground"
        >
          Código en GitHub
        </a>
      </div>
    </footer>
  );
}
