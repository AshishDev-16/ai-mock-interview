import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="relative z-10 mx-6 md:mx-20 lg:mx-32 pt-32 pb-20">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
