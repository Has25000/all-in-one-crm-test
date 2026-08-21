import { AddContactModal } from "./AddContactModal";
import { OutreachModal } from "./OutreachModal";
import { EventModal } from "./EventModal";
import { QuickActionModal } from "./QuickActionModal";
import { ClientDetailModal } from "../clients/ClientDetailModal";
import { MyCardModal } from "./MyCardModal";
import { ScheduleModal } from "./ScheduleModal";
import { CaptureModal } from "../events/CaptureModal";
import { NetworkEventModal } from "../events/NetworkEventModal";

export function ModalHost() {
  return (
    <>
      <AddContactModal />
      <OutreachModal />
      <EventModal />
      <QuickActionModal />
      <ClientDetailModal />
      <MyCardModal />
      <ScheduleModal />
      <CaptureModal />
      <NetworkEventModal />
    </>
  );
}
