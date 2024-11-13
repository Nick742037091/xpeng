import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/app/admin/(sidebar)/components/AppSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <SidebarTrigger />
          <div className="flex-1">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}
