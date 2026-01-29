import { BookIcon, GiftIcon, HeartIcon, UserRound } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    name: "خانه",
    value: "explore",
    icon: BookIcon,
    content: (
      <>
        <span className="text-foreground font-semibold">خانه</span>
      </>
    ),
  },
  {
    name: "علاقه مندی ها",
    value: "favorites",
    icon: HeartIcon,
    content: (
      <>
        <span className="text-foreground font-semibold">علاقه مندی ها</span>
      </>
    ),
  },
  {
    name: "دوره ها",
    value: "surprise",
    icon: GiftIcon,
    content: (
      <>
        <span className="text-foreground font-semibold">دوره ها</span>
      </>
    ),
  },
  {
    name: "اطلاعات کاربری",
    value: "profile",
    icon: UserRound,
    content: (
      <>
        <span className="text-foreground font-semibold">اطلاعات کاربری</span>
      </>
    ),
  },
];

const TabsMobile = () => {
  return (
    <div className="w-full fixed bottom-3 left-0 right-0 flex justify-center md:top-3 md:right-3 md:justify-start md:bottom-auto">
      <Tabs
        defaultValue="explore"
        className="gap-4 md:flex md:flex-col-reverse"
      >
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <p className="text-muted-foreground text-sm text-center">
              {tab.content}
            </p>
          </TabsContent>
        ))}
        <TabsList className="h-full">
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="text-[#32a8a2] flex flex-col items-center justify-center gap-1 px-2.5 sm:px-3"
            >
              <Icon />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabsMobile;
