/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBackground: '#F9FAFC', // Thêm màu nền tùy chỉnh
      },
      height: {
        'custom': '500px',
      },
    },
  },
  plugins: [],
}

