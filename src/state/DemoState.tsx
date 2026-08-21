import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CapturedContact, Category, TimeSlot } from "../data/types";
import { automations } from "../data/automations";

/**
 * All demo interactivity lives here.
 *
 * There is no backend and nothing persists: completing a follow-up or adding a
 * contact changes this session only, and a reload restores the pristine demo.
 */

export type GraphFilter = "all" | Extract<Category, "client" | "brand" | "team" | "media" | "community">;

export type ModalState =
  | { kind: "none" }
  | { kind: "add-contact" }
  | { kind: "outreach"; personId: string }
  | { kind: "event"; eventId: string }
  | { kind: "quick-action"; title: string; body: string }
  | { kind: "client"; clientId: string }
  | { kind: "my-card" }
  | { kind: "schedule"; personId: string }
  | { kind: "capture"; eventId: string }
  | { kind: "network-event"; eventId: string };

export type ProposedMeeting = { personId: string; slot: TimeSlot };

type State = {
  drawerPersonId: string | null;
  modal: ModalState;
  graphFilter: GraphFilter;
  completedTaskIds: string[];
  addedContactIds: string[];
  /** People captured live during this session, newest first. */
  captured: CapturedContact[];
  /** Which automations are switched on. */
  automationState: Record<string, boolean>;
  proposedMeetings: ProposedMeeting[];
};

type Action =
  | { type: "open-drawer"; personId: string }
  | { type: "close-drawer" }
  | { type: "open-modal"; modal: ModalState }
  | { type: "close-modal" }
  | { type: "set-graph-filter"; filter: GraphFilter }
  | { type: "complete-task"; taskId: string }
  | { type: "restore-task"; taskId: string }
  | { type: "add-contact"; personId: string }
  | { type: "capture-contact"; contact: CapturedContact }
  | { type: "update-capture"; id: string; changes: Partial<CapturedContact> }
  | { type: "toggle-automation"; automationId: string }
  | { type: "propose-meeting"; meeting: ProposedMeeting };

const initialState: State = {
  drawerPersonId: null,
  modal: { kind: "none" },
  graphFilter: "all",
  completedTaskIds: [],
  addedContactIds: [],
  captured: [],
  automationState: Object.fromEntries(automations.map((a) => [a.id, a.defaultOn])),
  proposedMeetings: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open-drawer":
      // Opening a relationship from inside a dialog should replace the dialog,
      // not stack on top of it.
      return { ...state, drawerPersonId: action.personId, modal: { kind: "none" } };
    case "close-drawer":
      return { ...state, drawerPersonId: null };
    case "open-modal":
      return { ...state, modal: action.modal };
    case "close-modal":
      return { ...state, modal: { kind: "none" } };
    case "set-graph-filter":
      return { ...state, graphFilter: action.filter };
    case "complete-task":
      return state.completedTaskIds.includes(action.taskId)
        ? state
        : { ...state, completedTaskIds: [...state.completedTaskIds, action.taskId] };
    case "restore-task":
      return {
        ...state,
        completedTaskIds: state.completedTaskIds.filter((id) => id !== action.taskId),
      };
    case "add-contact":
      return state.addedContactIds.includes(action.personId)
        ? state
        : { ...state, addedContactIds: [...state.addedContactIds, action.personId] };
    case "capture-contact":
      return { ...state, captured: [action.contact, ...state.captured] };
    case "update-capture":
      return {
        ...state,
        captured: state.captured.map((c) =>
          c.id === action.id ? { ...c, ...action.changes } : c,
        ),
      };
    case "toggle-automation":
      return {
        ...state,
        automationState: {
          ...state.automationState,
          [action.automationId]: !state.automationState[action.automationId],
        },
      };
    case "propose-meeting":
      return { ...state, proposedMeetings: [...state.proposedMeetings, action.meeting] };
    default:
      return state;
  }
}

type DemoContextValue = State & {
  openDrawer: (personId: string) => void;
  closeDrawer: () => void;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  setGraphFilter: (filter: GraphFilter) => void;
  completeTask: (taskId: string) => void;
  restoreTask: (taskId: string) => void;
  addContact: (personId: string) => void;
  captureContact: (contact: CapturedContact) => void;
  updateCapture: (id: string, changes: Partial<CapturedContact>) => void;
  toggleAutomation: (automationId: string) => void;
  proposeMeeting: (meeting: ProposedMeeting) => void;
  isTaskComplete: (taskId: string) => boolean;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDrawer = useCallback((personId: string) => dispatch({ type: "open-drawer", personId }), []);
  const closeDrawer = useCallback(() => dispatch({ type: "close-drawer" }), []);
  const openModal = useCallback((modal: ModalState) => dispatch({ type: "open-modal", modal }), []);
  const closeModal = useCallback(() => dispatch({ type: "close-modal" }), []);
  const setGraphFilter = useCallback(
    (filter: GraphFilter) => dispatch({ type: "set-graph-filter", filter }),
    [],
  );
  const completeTask = useCallback((taskId: string) => dispatch({ type: "complete-task", taskId }), []);
  const restoreTask = useCallback((taskId: string) => dispatch({ type: "restore-task", taskId }), []);
  const addContact = useCallback((personId: string) => dispatch({ type: "add-contact", personId }), []);
  const captureContact = useCallback(
    (contact: CapturedContact) => dispatch({ type: "capture-contact", contact }),
    [],
  );
  const updateCapture = useCallback(
    (id: string, changes: Partial<CapturedContact>) =>
      dispatch({ type: "update-capture", id, changes }),
    [],
  );
  const toggleAutomation = useCallback(
    (automationId: string) => dispatch({ type: "toggle-automation", automationId }),
    [],
  );
  const proposeMeeting = useCallback(
    (meeting: ProposedMeeting) => dispatch({ type: "propose-meeting", meeting }),
    [],
  );

  const value = useMemo<DemoContextValue>(
    () => ({
      ...state,
      openDrawer,
      closeDrawer,
      openModal,
      closeModal,
      setGraphFilter,
      completeTask,
      restoreTask,
      addContact,
      captureContact,
      updateCapture,
      toggleAutomation,
      proposeMeeting,
      isTaskComplete: (taskId: string) => state.completedTaskIds.includes(taskId),
    }),
    [
      state,
      openDrawer,
      closeDrawer,
      openModal,
      closeModal,
      setGraphFilter,
      completeTask,
      restoreTask,
      addContact,
      captureContact,
      updateCapture,
      toggleAutomation,
      proposeMeeting,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoState(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoState must be used inside DemoStateProvider");
  return ctx;
}
