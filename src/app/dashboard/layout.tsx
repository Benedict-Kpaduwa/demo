import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* <Sidebar /> */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
