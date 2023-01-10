import * as line from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET
};

export const lineClient = new line.Client(config);
