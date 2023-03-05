import { Notice, Notices, Page } from "../../types";

export type UseNotices = {
  notices?: Notices;
  page?: Page;
  isLoading: boolean;
  isError: boolean;
};

export type UseNotice = {
  notice?: Notice;
  isLoading: boolean;
  isError: boolean;
};
