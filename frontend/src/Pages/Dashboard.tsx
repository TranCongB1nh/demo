import { CustomSidebar } from "@/components/custom-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { ContactList } from "@/components/contact-list";
import { DatePickerWithRange } from "@/components/date-picker";

const mostVisitedContacts = [
  { name: "Airbnb", icon: "🏠", visits: 0 },
  { name: "Amazon", icon: "🛒", visits: 0 },
  { name: "Qualcomm", icon: "📶", visits: 0 },
  { name: "Adobe", icon: "🎨", visits: 0 },
  { name: "Kathleen Graves", icon: "👩‍💼", visits: 0 },
  { name: "Gabriel Fischer", icon: "👨‍💼", visits: 0 },
];

const leastVisitedContacts = [
  { name: "Victoria Ballard", icon: "👩", visits: 0 },
  { name: "Zoom", icon: "🎥", visits: 0 },
  { name: "Microsoft", icon: "💻", visits: 0 },
  { name: "Gabriel Fischer", icon: "👨‍💼", visits: 0 },
  { name: "Kathleen Graves", icon: "👩‍💼", visits: 0 },
  { name: "Vivian Casey", icon: "👩", visits: 0 },
];

export default function Dashboard() {
  return (
    <div className="bg-black min-h-screen flex">
      <SidebarProvider>
        <CustomSidebar />

        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-20 bg-black border-b border-zinc-800">
            <SiteHeader />

            <div className="flex items-center gap-4 bg-black border-b border-zinc-800 p-4">
              <Tabs defaultValue="30d">
                <TabsList className="bg-zinc-900 text-zinc-300 rounded-lg">
                  <TabsTrigger value="1d">1d</TabsTrigger>
                  <TabsTrigger value="3d">3d</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
              </Tabs>

              <DatePickerWithRange />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-rows-2 gap-6 mx-[96px]">
              {/* Chart chiếm 1 hàng */}
              <div className="w-full bg-zinc-900 p-6 rounded-lg">
                <ChartAreaInteractive />
              </div>

              {/* Contact Overview chiếm 1 hàng */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactList
                  title="Most visited contacts"
                  contacts={mostVisitedContacts}
                />
                <ContactList
                  title="Least visited contacts"
                  contacts={leastVisitedContacts}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
