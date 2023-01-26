export type User = {
  id: number;
  email: string;
  lineUserId: string;
  isLineAccountLinkaged: boolean;
  lineName: string;
  lineProfileImageUrl: string;
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

export type GroupTalkRoom = {
  id: number;
  lineName: string;
  lineProfileImageUrl: string;
  lineGroupId: string;
};
export type GroupTalkRooms = GroupTalkRoom[];

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
export type NoticeType = "scheduled" | "draft" | "sent";
