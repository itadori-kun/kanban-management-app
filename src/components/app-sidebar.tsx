"use client";

// Import the necessary components from the `react` and `next-themes` packages.
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BoardIcon } from "@/components/icons/boardIcon"
import { Toggle } from "@/components/toggle"
import { DarkLogo } from "@/components/icons/darkLogo"
import { LightLogo } from "@/components/icons/lightLogo"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarTrigger2
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

export function AppSidebar(): React.ReactNode {
    const [ sidebarIcon, setSidebarIcon ] = useState<boolean>( true );
    const [ display, setDisplay ] = useState<string>( 'block' );


    useEffect( () => {
        const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

        const updateDisplay = () => {
            if ( sidebarItems.dataset.state === 'expanded' ) {
                setSidebarIcon( sidebarIcon );
                setDisplay( 'block' );
            } else {
                setSidebarIcon( !sidebarIcon );
                setDisplay( 'hidden' );
            }
        };

        updateDisplay(); // Initial check

        const observer = new MutationObserver( updateDisplay );
        observer.observe( sidebarItems, { attributes: true, attributeFilter: [ 'data-state' ] } );

        return () => observer.disconnect(); // Cleanup on unmount
    }, [] );


    const { theme, systemTheme } = useTheme();
    return (
        <div className="flex-col flex relative top-0 font-plusJakarta">
            <div className={ `${ display }` }>
                <Sidebar >
                    <SidebarContent >
                        <SidebarGroup className="pl-0">

                            {/* Logo region: this changes according to the theme.*/ }
                            <header className="mx-7 pt-8 pb-14">
                                { ( theme || systemTheme ) === 'light' ? <DarkLogo /> : <LightLogo /> }
                            </header>

                            {/* side bar navigation area where new boards are created*/ }
                            <SidebarGroupLabel className="text-transform: uppercase ml-7 pl-0 text-xs font-bold pb-5 text-L828fa3 tracking-widest">
                                All Boards ( 3 )
                            </SidebarGroupLabel>
                            <SidebarGroupContent >
                                <SidebarMenu className="text-transform: capitalize gap-0">

                                    {/* populate existing board from storage or database*/ }
                                    { items.map( ( item ) => (
                                        <SidebarMenuItem key={ item.title } className="py-2 pl-6 mr-6 rounded-r-full text-L828fa3  hover:text-white hover:bg-L635fc7 active:bg-L635fc7 ">
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
                <div className=" w-10/12 h-12 ml-6 mr-4 sticky bottom-16 z-10 bg-Lf4f7fd dark:bg-L20212c rounded-lg ">
                    <Toggle />
                </div>
            </div>

            {/* Hide sidebar region */ }
            { sidebarIcon ? ( <div className="w-10/12 sticky bottom-7 z-10 text-transform:capitalize flex items-center gap-1 pl-6 text-L828fa3 text-base cursor-pointer hover:text-L828fa3/70 rounded-r-full">
                <SidebarTrigger2 />
            </div> ) : (
                <div className=" absolute w-fit bottom-7 z-10 flex items-center gap-1 px-2 text-white bg-L635fc7 rounded-r-full cursor-pointer">
                    <SidebarTrigger />
                </div>
            ) }

        </div>
    )
}
