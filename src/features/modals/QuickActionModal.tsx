import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";

/** Small acknowledgement for actions the concept demo mocks rather than performs. */
export function QuickActionModal() {
  const { modal, closeModal } = useDemoState();
  const open = modal.kind === "quick-action";
  if (!open) return null;

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && closeModal()}
      title={modal.title}
      width="420px"
      footer={
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={closeModal}>
            Got it
          </Button>
        </div>
      }
    >
      <p className="text-[13.5px] leading-relaxed text-charcoal">{modal.body}</p>
    </Modal>
  );
}
