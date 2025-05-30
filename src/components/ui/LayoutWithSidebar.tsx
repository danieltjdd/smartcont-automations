import React from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    // Usuário não autenticado: não renderiza sidebar nem header/footer
    return <>{children}</>;
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar className="bg-white border-r border-gray-200">
          <SidebarHeader>
            <div className="font-bold text-lg text-smartcont-700 mb-4">SmartCont</div>
          </SidebarHeader>
          <SidebarContent>
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className="px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
              <Link href="/modulos" className="px-4 py-2 rounded hover:bg-gray-100">Módulos</Link>
              <Link href="/perfil" className="px-4 py-2 rounded hover:bg-gray-100">Perfil</Link>
              <Link href="/configuracoes" className="px-4 py-2 rounded hover:bg-gray-100">Configurações</Link>
              <Link href="/historico" className="px-4 py-2 rounded hover:bg-gray-100">Histórico</Link>
            </nav>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} SmartCont</div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
} 