import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/shell/AppShell";
import { DemoStateProvider } from "./state/DemoState";
import { RelationshipDrawer } from "./features/drawer/RelationshipDrawer";
import { ModalHost } from "./features/modals/ModalHost";
import { Dashboard } from "./pages/Dashboard";
import { NetworkPage } from "./pages/NetworkPage";
import { ClientsPage } from "./pages/ClientsPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { CalendarPage } from "./pages/CalendarPage";
import { EventsPage } from "./pages/EventsPage";
import { OutreachPage } from "./pages/OutreachPage";
import { DocumentsPage } from "./pages/DocumentsPage";

export default function App() {
  return (
    <DemoStateProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/outreach" element={<OutreachPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </AppShell>
      <RelationshipDrawer />
      <ModalHost />
    </DemoStateProvider>
  );
}
