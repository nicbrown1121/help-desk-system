/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "custom-name": "10%", // Table width for Name column
        "custom-email": "20%", // Table width for Email column
        "custom-description": "40%", // Table width for Description column
        "custom-view": "10%", //Table width for View Ticket column
      },
    },
  },
  plugins: [],
};
