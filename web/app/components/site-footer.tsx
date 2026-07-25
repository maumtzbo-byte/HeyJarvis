export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} HeyJarvis. En fase de validación privada.</p>
        <a
          href="https://github.com/maumtzbo-byte/HeyJarvis"
          className="hover:text-foreground"
        >
          Código en GitHub
        </a>
      </div>
    </footer>
  );
}
