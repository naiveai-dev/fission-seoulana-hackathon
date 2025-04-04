export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh max-w-3xl w-full mx-auto px-2">{children}</main>
  );
}
