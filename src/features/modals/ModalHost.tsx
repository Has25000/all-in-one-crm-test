import { AddContactModal } from "./AddContactModal";
import { OutreachModal } from "./OutreachModal";
import { EventModal } from "./EventModal";
import { QuickActionModal } from "./QuickActionModal";
import { ClientDetailModal } from "../clients/ClientDetailModal";
import { ScheduleModal } from "./ScheduleModal";
import { CaptureModal } from "../events/CaptureModal";
import { NetworkEventModal } from "../events/NetworkEventModal";
import { OpportunityDetailModal } from "../opportunities/OpportunityDetailModal";
import { LogActivityModal } from "./LogActivityModal";
import { ShareSheet } from "../card/ShareSheet";

export function ModalHost() {
  return (
    <>
      <AddContactModal />
      <OutreachModal />
      <EventModal />
      <QuickActionModal />
      <ClientDetailModal />
      <ScheduleModal />
      <CaptureModal />
      <NetworkEventModal />
      <OpportunityDetailModal />
      <LogActivityModal />
      <ShareSheet />
    </>
  );
}
