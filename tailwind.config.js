/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Inconsolata", "Courier New"],
      },
      fontSize: {
        xxs: "0.625rem", // 10px
        xs: "0.75rem", // 12px
        sm: "0.82rem", // 13px
        base: "0.875rem", // 14px
        md: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.5rem", // 24px,
        xxl: "2rem",
        xl4: "4rem",
        thead: "0.82rem",
      },
      spacing: {
        xxs: "0.15rem",
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "1rem", // 16px
        lg: "1.25rem", // 24px
        xl: "3rem", // 48px,
        xxl: "5rem",
        side: "16.25rem", // sideMenuWidth,
      },
      width: {
        sidemenu: "16.25rem",
        30: "22.5rem",
        25: "16rem",
        20: "5rem",
        10: "2.5rem",
      },
      height: {
        15: "3.75rem", //60px,
        20: "5rem",
        10: "2.5rem",
        68: "17.25rem",
        field: "2.625rem",
        min: "18px",
      },
      minHeight: {
        6: "1.5rem", // 24px
        14: "3.5rem", // 56px
        15: "3.75rem", // 60px,
        field: "2.625rem",
        page: "20rem",
      },
      minWidth: {
        72: "18rem", // 288px
      },
      maxWidth: {
        18: "7rem", // 128px
        32: "8rem", // 128px
        r10: "10rem",
        r12: "12rem",
      },
      colors: {
        current: "currentColor",
        white: {
          DEFAULT: "#ffffff",
          dark: "#f1f1f4",
          darker: "#E2E4E4",
          darkest: "#C7CBCC",
        },
        blue: {
          opaque: "#E8E9ED",
          lightest: "#5C6280",
          lighter: "#5C6280",
          light: "#454C6E",
          DEFAULT: "#161F4A",
          dark: "#0D132C",
          darker: "#69a1b5",
          darkest: "#0C1129",
        },
        black: {
          light: "#0a3637",
          lighter: "#2b2b2b",
          DEFAULT: "#161818",
          dark: "#000000",
        },
        gray: {
          lightest: "#F2F6F7",
          lighter: "#9b9ca5",
          light: "#aaadb9",
          DEFAULT: "#7a7984",
          dark: "#9b9ca5",
          darker: "#5E6668",
          disabled: "#f5f5f5",
          border: "#e6f0f3",
        },
        red: {
          lightest: "#e94540",
          lighter: "#ff6464",
          light: "#ed4848",
          DEFAULT: "#c83636",
          dark: "#d73535",
          darker: "#d73535",
        },
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
}
