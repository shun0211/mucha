import { LINE_LOGIN_CHANNEL_ID, LINE_LOGIN_REDIRECT_URL } from "../config/constants";

export const handleLinelogin = () => {
  const encodedRedirectUrl = encodeURI(LINE_LOGIN_REDIRECT_URL);
  window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_LOGIN_CHANNEL_ID}&redirect_uri=${encodedRedirectUrl}&state=12345abcde&scope=profile%20openid`;
};
