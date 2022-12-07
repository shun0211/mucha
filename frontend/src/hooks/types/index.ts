import { Notices, Page } from "../../types";

export type UseNotices = {
  notices?: Notices;
  page?: Page;
  isLoading: boolean;
  isError: boolean;
};
