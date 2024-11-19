import { PropIcons } from "@/types";

export const MobileLogo = ( { secondaryColor = "#6357c7" }: PropIcons ) => {
    return (
        <svg width="24" height="25" className="block md:hidden" xmlns="http://www.w3.org/2000/svg"><g fill={ secondaryColor } fillRule="evenodd"><rect width="6" height="25" rx="2" /><rect opacity=".75" x="9" width="6" height="25" rx="2" /><rect opacity=".5" x="18" width="6" height="25" rx="2" /></g></svg>
    )
}