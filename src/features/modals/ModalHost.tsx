import { AddContactModal } from "./AddContactModal";
import { OutreachModal } from "./OutreachModal";
import { EventModal } from "./EventModal";
import { QuickActionModal } from "./QuickActionModal";
import { ClientDetailModal } from "../clients/ClientDetailModal";

export function ModalHost() {
  return (
    <>
      <AddContactModal />
      <OutreachModal />
      <EventModal />
      <QuickActionModal />
      <ClientDetailModal />
    </>
  );
}
