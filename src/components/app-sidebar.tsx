import { BoardIcon } from "@/components/icons/boardIcon"
import { Toggle } from "@/components/toggle"
import { DarkLogo } from "@/components/icons/darkLogo"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "platform launch",
        url: "#",
        icon: BoardIcon,
    },
    {
        title: "marketing plan",
        url: "#",
        icon: BoardIcon,
    },
    {
        title: "roadmap",
        url: "#",
        icon: BoardIcon,
    }
]

export function AppSidebar() {
    return (
        <div className="flex-col flex relative top-0 font-plusJakarta">
            <Sidebar >
                <SidebarContent >
                    <SidebarGroup className="pl-0">
                        {/* Logo region */ }
                        <header className="mx-7 pt-8 pb-14">
                            <DarkLogo />
                        </header>
                        {/* side bar navigation area */ }
                        <SidebarGroupLabel className="text-transform: uppercase ml-7 pl-0 text-xs font-bold pb-5 text-L828fa3 tracking-widest">
                            All Boards ( 3 )
                        </SidebarGroupLabel>
                        <SidebarGroupContent >
                            <SidebarMenu className="text-transform: capitalize gap-0">

                                {/* populate existing board*/ }
                                { items.map( ( item ) => (
                                    <SidebarMenuItem key={ item.title } className="py-2 pl-6 mr-6 rounded-r-full text-L828fa3  hover:text-white hover:bg-L635fc7 ">
                                        <SidebarMenuButton asChild className="pl-1 text-base font-bold bg-transparent hover:bg-transparent active:bg-transparent ">
                                            <a href={ item.url }>
                                                <item.icon />
                                                <span>{ item.title }</span>
                                            </a>
                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                ) ) }

                                {/* Create new board */ }
                                <SidebarMenuItem className="py-2 pl-6 mr-6 rounded-r-full text-L635fc7 hover:text-white hover:bg-L635fc7 ">
                                    <SidebarMenuButton asChild className="pl-1 text-base font-bold bg-transparent hover:bg-transparent active:bg-transparent ">
                                        <a >
                                            <BoardIcon />
                                            <span>+ Create New Board</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            {/* Toggle section */ }
            <div className=" w-10/12 h-12 ml-6 mr-4 absolute bottom-16 z-10 bg-Lf4f7fd dark:bg-L20212c rounded-lg ">
                <Toggle />
            </div>

            {/* Hide sidebar region */ }
            <div className="w-10/12 absolute bottom-7 z-10 text-transform:capitalize flex items-center gap-1 ml-6 text-L828fa3 text-base">
                <SidebarTrigger />
                <span>Hide sidebar</span>
            </div>
        </div>
    )
}
