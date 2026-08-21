import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  CapturedContact,
  Category,
  OpportunityStage,
  RecordActivity,
  TimeSlot,
} from "../data/types";
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
  | { kind: "schedule"; personId: string }
  | { kind: "capture"; eventId: string }
  | { kind: "network-event"; eventId: string }
  | { kind: "opportunity"; opportunityId: string }
  | { kind: "log-activity"; personId?: string; opportunityId?: string }
  | { kind: "share-card"; personId?: string };

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
  /** Stage moves made on the board this session. */
  stageOverrides: Record<string, OpportunityStage>;
  /** Calls, emails, and notes logged this session. */
  loggedActivity: RecordActivity[];
  /** Which of Sydney's cards she is handing out. */
  cardVariantId: string;
  /** Per-field visibility on top of the chosen card. */
  cardFieldOverrides: Record<string, boolean>;
  /** People handed the card during this session. */
  sessionShares: { id: string; to: string; method: string }[];
  /** Index of the active walkthrough step, or null when the tour is closed. */
  tourStep: number | null;
  tourDismissed: boolean;
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
  | { type: "propose-meeting"; meeting: ProposedMeeting }
  | { type: "move-stage"; opportunityId: string; stage: OpportunityStage }
  | { type: "log-activity"; activity: RecordActivity }
  | { type: "set-card-variant"; variantId: string }
  | { type: "toggle-card-field"; field: string }
  | { type: "record-share"; to: string; method: string }
  | { type: "set-tour-step"; step: number | null }
  | { type: "dismiss-tour-invite" };

const initialState: State = {
  drawerPersonId: null,
  modal: { kind: "none" },
  graphFilter: "all",
  completedTaskIds: [],
  addedContactIds: [],
  captured: [],
  automationState: Object.fromEntries(automations.map((a) => [a.id, a.defaultOn])),
  proposedMeetings: [],
  stageOverrides: {},
  loggedActivity: [],
  cardVariantId: "full",
  cardFieldOverrides: {},
  sessionShares: [],
  tourStep: null,
  tourDismissed: false,
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
    case "move-stage":
      return {
        ...state,
        stageOverrides: { ...state.stageOverrides, [action.opportunityId]: action.stage },
      };
    case "log-activity":
      return { ...state, loggedActivity: [action.activity, ...state.loggedActivity] };
    case "set-card-variant":
      return { ...state, cardVariantId: action.variantId, cardFieldOverrides: {} };
    case "toggle-card-field":
      return {
        ...state,
        cardFieldOverrides: {
          ...state.cardFieldOverrides,
          [action.field]: state.cardFieldOverrides[action.field] === false,
        },
      };
    case "set-tour-step":
      return { ...state, tourStep: action.step, tourDismissed: true };
    case "dismiss-tour-invite":
      return { ...state, tourDismissed: true };
    case "record-share":
      return {
        ...state,
        sessionShares: [
          { id: `share-${state.sessionShares.length}`, to: action.to, method: action.method },
          ...state.sessionShares,
        ],
      };
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
  moveStage: (opportunityId: string, stage: OpportunityStage) => void;
  logActivity: (activity: RecordActivity) => void;
  setCardVariant: (variantId: string) => void;
  toggleCardField: (field: string) => void;
  recordShare: (to: string, method: string) => void;
  setTourStep: (step: number | null) => void;
  dismissTourInvite: () => void;
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
  const moveStage = useCallback(
    (opportunityId: string, stage: OpportunityStage) =>
      dispatch({ type: "move-stage", opportunityId, stage }),
    [],
  );
  const logActivity = useCallback(
    (activity: RecordActivity) => dispatch({ type: "log-activity", activity }),
    [],
  );
  const setCardVariant = useCallback(
    (variantId: string) => dispatch({ type: "set-card-variant", variantId }),
    [],
  );
  const toggleCardField = useCallback(
    (field: string) => dispatch({ type: "toggle-card-field", field }),
    [],
  );
  const recordShare = useCallback(
    (to: string, method: string) => dispatch({ type: "record-share", to, method }),
    [],
  );
  const setTourStep = useCallback(
    (step: number | null) => dispatch({ type: "set-tour-step", step }),
    [],
  );
  const dismissTourInvite = useCallback(() => dispatch({ type: "dismiss-tour-invite" }), []);

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
      moveStage,
      logActivity,
      setCardVariant,
      toggleCardField,
      recordShare,
      setTourStep,
      dismissTourInvite,
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
      moveStage,
      logActivity,
      setCardVariant,
      toggleCardField,
      recordShare,
      setTourStep,
      dismissTourInvite,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoState(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoState must be used inside DemoStateProvider");
  return ctx;
}
