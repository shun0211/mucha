export type User = {
  id: number;
  email: string;
  lineUserId: string;
  isLineAccountLinkaged: boolean;
  lineName: string;
  lineProfileImageUrl: string;
  isFriend: boolean;
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
  scheduledDatetimes: string[];
};
export type Notices = Notice[];

type Schedule = {
  title: string;
  description: string;
  source_url: string;
  source: string;
  bookingDetail: string;
};

export type GoogleCalendarNotice = Notice & {
  schedule: Schedule;
};

export type GroupTalkRoom = {
  id: number;
  lineName: string;
  lineProfileImageUrl: string;
  lineGroupId: string;
};
export type GroupTalkRooms = GroupTalkRoom[];

export type NoticeTargetData = {
  value: string;
  label: string;
}[];

export type ErrorMessage = {
  errorMessage: string;
  forDeveloperMessage: string;
};

export type ErrorMessages = {
  errorMessages: string[];
  forDeveloperMessage: string;
};

export type Page = {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
};

export type TalkType = "dm" | "groupTalk";
export type NoticeType = "scheduled" | "draft" | "sent";

export type ShoppingList = {
  id: number;
  name: string;
  isDone: boolean;
  doneAt: string;
  dispOrder: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type ShoppingLists = ShoppingList[];
