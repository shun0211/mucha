export type User = {
  id: number;
  email: string;
  lineUserId: string;
};

export type Notice = {
  id: number;
  title: string;
  scheduledAt: string;
  sentAt: string;
  repeat: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  message: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  repeatedWeeks: string;
};

export type Notices = Notice[];

export type ErrorMessage = {
  message: string;
  forDeveloperMessage: string;
};

export type ErrorMessages = {
  messages: string[];
  forDeveloperMessage: string;
};

export type Page = {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
};

export type TalkType = "dm" | "groupTalk";
