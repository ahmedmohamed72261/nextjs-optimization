import localFont from "next/font/local"

export const cairoFont = localFont({
  src: [
    {
      path: "./Cairo-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Cairo-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Cairo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Cairo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Cairo-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Cairo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Cairo-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Cairo-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
})
