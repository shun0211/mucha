module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#65A7A3',
        'accent': '#F5E682',
        'shadow': '#ACACAC',
        'background': '#F5F5F5',
        'yellow': '#FFDC00',
        'link-color': '#0073CC',
        'hover-color': '#f8f9fa',
        'bg-color': '#F5F5F5',
        'white': '#FFFFFF',
        'line-color': '#06c755',
        'light-yellow': '#FFF7C1',
        'draft-button': '#868e96',
        'light-gray': '#FAF9F4',
        'light-black': '#545454',
        'orange': '#DB7F58',
        'gray': '#767676',
        'green': '#69ABA7'
      },
      fontFamily: {
        bellota: ['Bellota Text'],
      },
      textDecorationThickness: {
        3: '3px',
      },
      /** 既存のborderWidthを上書きする */
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '0.5': '0.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
};
