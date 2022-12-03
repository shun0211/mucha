/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// Full Calendarはnode_modules内にCSSが含まれているため以下の設定が必要
// https://qiita.com/tak001/items/b57459db58f6ff8658a4
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/react",
]);

module.exports = withTM(nextConfig);
