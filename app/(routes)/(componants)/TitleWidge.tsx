import { LucideIcon } from "lucide-react";

import React from "react";

const TitleWidge = ({ Icon, title }: { Icon: LucideIcon; title: string }) => {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#062657]/10 bg-white px-4 py-2 shadow-sm">
      {<Icon className="h-4 w-4 text-[#be0e10]" />}
      <span className="text-sm font-medium text-[#062657]">{title}</span>
    </div>
  );
};

export default TitleWidge;
