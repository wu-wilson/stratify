import { type SettingsPage } from "./Page/types";

const pagesConfig: SettingsPage[] = [
  {
    id: 1,
    sections: [
      {
        id: 1,
        rows: [
          {
            id: 1,
            label: "Personal Information",
            content: "Personal Information",
            subpage: 2,
          },
          { id: 2, label: "Date & Time", content: "Date & Time", subpage: 3 },
          { id: 3, label: "Appearance", content: "Appearance", subpage: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    parent: { pageId: 1, sectionId: 1, rowId: 1 },
    sections: [
      {
        id: 1,
        rows: [
          { id: 1, label: "UID", content: "UID" },
          { id: 2, label: "Name", content: "Name", subpage: 5 },
          { id: 3, label: "Created On", content: "Created On" },
        ],
      },
    ],
  },
  {
    id: 3,
    parent: { pageId: 1, sectionId: 1, rowId: 2 },
    sections: [
      {
        id: 1,
        rows: [
          { id: 1, label: "24-Hour Time", content: "24-Hour Time" },
          { id: 2, label: "Time", content: "Time" },
          { id: 3, label: "Timezone", content: "Timezone" },
        ],
      },
    ],
  },
  {
    id: 4,
    parent: { pageId: 1, sectionId: 1, rowId: 3 },
    sections: [
      {
        id: 1,
        rows: [
          { id: 1, label: "Set Automatically", content: "Set Automatically" },
          { id: 2, label: "Theme", content: "Theme" },
        ],
      },
    ],
  },
  {
    id: 5,
    parent: { pageId: 2, sectionId: 1, rowId: 2 },
    sections: [
      {
        id: 1,
        rows: [
          { id: 1, label: "First Name", content: "First Name" },
          { id: 2, label: "Last Name", content: "Last Name" },
        ],
      },
    ],
  },
];

export const pages = new Map(pagesConfig.map((p) => [p.id, p]));
