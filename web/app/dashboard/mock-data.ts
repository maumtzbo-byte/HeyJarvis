export type MockMemory = {
  id: string;
  summary: string;
  text: string;
  group: string;
  time: string;
};

export const mockMemories: MockMemory[] = [
  {
    id: "mem-1",
    summary: "Meeting with Carlos, Thursday 3pm",
    text: "Hey Siri, remember my meeting with Carlos is on Thursday at 3pm to review the project.",
    group: "Today",
    time: "9:41 AM",
  },
  {
    id: "mem-2",
    summary: "Mom's birthday gift idea: the blue scarf",
    text: "Remind me that mom wants the blue scarf from the store downtown for her birthday.",
    group: "Today",
    time: "11:02 AM",
  },
  {
    id: "mem-3",
    summary: "Flight lands 6:40pm, tell Sam",
    text: "My flight on Friday lands at 6:40pm, I need to text Sam to pick me up.",
    group: "Yesterday",
    time: "2:17 PM",
  },
  {
    id: "mem-4",
    summary: "Dentist appointment moved to next Tuesday",
    text: "The dentist called, my appointment moved from Monday to next Tuesday at 9am.",
    group: "Yesterday",
    time: "8:55 PM",
  },
  {
    id: "mem-5",
    summary: "Idea: rename the roadmap section to 'What's next'",
    text: "Idea for the landing page: rename the roadmap section to something less formal, like 'What's next'.",
    group: "This week",
    time: "Tue, 4:30 PM",
  },
  {
    id: "mem-6",
    summary: "Wifi password at the office: sunset-2847",
    text: "The office wifi password is sunset-2847, in case I forget again.",
    group: "Last week",
    time: "Fri, 10:12 AM",
  },
];

export type MockChatMessage = {
  role: "user" | "assistant";
  text: string;
  memoriesUsed?: string[];
};

export const mockConversationStarter: MockChatMessage[] = [
  {
    role: "user",
    text: "When am I meeting Carlos?",
  },
  {
    role: "assistant",
    text: "Your meeting with Carlos is Thursday at 3pm, to review the project.",
    memoriesUsed: ["Meeting with Carlos, Thursday 3pm"],
  },
];
