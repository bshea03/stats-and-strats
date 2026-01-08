import {
  Award,
  Book,
  Gamepad2,
  Gauge,
  MonitorPlay,
  Wrench,
} from "lucide-react";

// menu items
export const getItems = (gameName: string | undefined) => ({
  statsItems: [
    {
      title: "Personal Bests",
      url: `/${gameName}/personal-bests`,
      icon: Award,
    },
    {
      title: "ILs",
      url: `/${gameName}/individual-levels`,
      icon: Gauge,
    },
    {
      title: "Past Runs",
      url: `/${gameName}/past-runs`,
      icon: Gamepad2,
    },
  ],
  toolsItems: [
    {
      title: "Guides",
      url: `/${gameName}/guides`,
      icon: Book,
    },
    {
      title: "Videos",
      url: `/${gameName}/videos`,
      icon: MonitorPlay,
    },
    {
      title: "Tools",
      url: `/${gameName}/tools`,
      icon: Wrench,
    },
  ],
});
