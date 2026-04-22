// Path: app\(auth)\layout.tsx

// This layout wraps the login and register pages.
// It centers the content vertically and horizontally on the screen.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* bg-background uses your Tailwind/shadcn theme color.
        This means it respects dark mode automatically. */}
      {children}
    </div>
  );
}
