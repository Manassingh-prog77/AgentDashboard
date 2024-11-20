"use client";
export default function DashboardLayout({
  children,
  right,
  middle,
  leftSidebar
}: {
  children: React.ReactNode;
  right: React.ReactNode;
  middle: React.ReactNode;
  leftSidebar: React.ReactNode;
}) {
  return (
    <>
      {children}
    <div className="min-h-screen flex bg-[#f4f4f9]">
      {/* Combined Left Sidebar */}
      <div
        className="w-[26%] flex flex-row bg-gray-100 border-2 border-gray-300"
        style={{ height: "100vh" }}
      >
        {leftSidebar}
      </div>

      {/* Middle Section */}
      <div
        className="flex-grow bg-white border-2 border-gray-300"
        style={{ height: "100vh" }}
      >
        {middle}
      </div>

      {/* Right Section */}
      <div
        className="w-[25%] bg-white border-2 border-gray-300"
        style={{ height: "100vh" }}
      >
        {right}
      </div>
    </div>
    </>
  );
}