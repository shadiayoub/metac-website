import CustomButton from "@/components/custom/CustomButton";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import React from "react";

export default function DownloadButton() {
  return (
    <>
      {/* <Button
        className={
          "bg-[#B848D8] hover:bg-[#9637b1] text-white flex items-center gap-2 rounded-[20px] h-14 text-lg font-medium"
        }
      > */}
      <a href="https://play.google.com/store/apps/details?id=com.metacces.game" target="_blank" rel="noopener noreferrer">
        <CustomButton color="#B848D8" fillColor="#9637b1">
          <div className="flex flex-row items-center gap-2 h-10 text-lg">
            <span>
              <DownloadIcon className="size-6" />
            </span>
            <span>Download App</span>
          </div>
        </CustomButton>
      </a>
      {/* </Button> */}
    </>
  );
}
