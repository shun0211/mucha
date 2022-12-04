export type User = {
  id: number;
  email: string;
  lineUserId: string;
};

export type Notice = {
  id: number;
  title: string;
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
};
