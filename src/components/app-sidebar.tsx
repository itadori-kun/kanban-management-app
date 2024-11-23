"use client";

// Import the necessary components from the `react` and `next-themes` packages.
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { BoardIcon } from "@/components/icons/boardIcon"
import { Toggle } from "@/components/toggle"
import { DarkLogo } from "@/components/icons/darkLogo"
import { LightLogo } from "@/components/icons/lightLogo"
import { useAppContext } from "@/context";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function AppSidebar(): JSX.Element {
    const mounted = useRef( false );
    const { theme, systemTheme } = useTheme();
    const [ sidebarIcon, setSidebarIcon ] = useState<boolean>( true );
    const { handleAddBoard, projects, fetchAllBoardData, setBoardId } = useAppContext();

    const pathname = usePathname();

    useEffect( () => {
        const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

        const updateWidth = () => {
            if ( sidebarItems.dataset.state === 'expanded' ) {
                setSidebarIcon( sidebarIcon );
                // setDisplay( 'block' );
            } else {
                setSidebarIcon( !sidebarIcon );
                // setDisplay( 'hidden' );
            }
        };


        updateWidth(); // Initial check

        const observer = new MutationObserver( updateWidth );
        observer.observe( sidebarItems, { attributes: true, attributeFilter: [ 'data-state' ] } );

        return () => observer.disconnect(); // Cleanup on unmount
    }, [] );
    useEffect( () => {
        mounted.current = true;
        fetchAllBoardData();
        return () => {
            mounted.current = false;
        };
    }, [ projects ] )





    return (
        <div className="flex h-dvh flex-col relative top-0 left-3 font-plusJakarta">
            <div  >
                <Sidebar className=" absolute left-0 top-0 h-full ">
                    <SidebarContent >
                        <SidebarGroup className="pl-0 h-dvh">

                            {/* Logo region: this changes according to the theme.*/ }
                            <header className="mx-7 pt-8 pb-14">
                                { systemTheme === "light" || theme === 'light' ? <DarkLogo /> : <LightLogo /> }
                            </header>

                            {/* side bar navigation area where new boards are created*/ }
                            <SidebarGroupLabel className="text-transform: uppercase ml-7 pl-0 text-xs font-bold pb-5 text-L828fa3 tracking-widest">
                                All Boards ( { projects.length } )
                            </SidebarGroupLabel>
                            <div className="h-full flex flex-col justify-between ">
                                <SidebarGroupContent >
                                    <SidebarMenu className="text-transform: capitalize gap-0">

                                        {/* populate existing board from storage or database*/ }
                                        { projects.map( ( item ) => {
                                            const isActive = pathname === `/${ item.url }`
                                            return (
                                                <SidebarMenuItem key={ item.title } className={ isActive ? "py-2 pl-6 mr-6 rounded-r-full text-white dark:hover:bg-white hover:bg-L635fc7/10 hover:text-L635fc7 bg-L635fc7" : "py-2 pl-6 mr-6 rounded-r-full text-L828fa3  dark:hover:bg-white hover:bg-L635fc7/10 hover:text-L635fc7" }>
                                                    <SidebarMenuButton asChild className="pl-1 text-base font-bold bg-transparent hover:bg-transparent hover:text-inherit active:text-inherit active:bg-transparent ">
                                                        <Link href={ item.url } onClick={ () => { setBoardId( item.id ) } }>
                                                            {/* <item.icon /> */ }
                                                            <BoardIcon />
                                                            <span>{ item.title }</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        } ) }

                                        {/* Create new board */ }
                                        <SidebarMenuItem className="py-2 pl-6 mr-6 rounded-r-full text-L635fc7  hover:bg-white dark:hover:bg-white hover:bg-L635fc7/10 hover:text-L635fc7  cursor-pointer" onClick={ handleAddBoard }>
                                            <SidebarMenuButton asChild className="pl-1 text-base font-bold bg-transparent hover:bg-transparent active:bg-transparent hover:text-inherit active:text-inherit">
                                                <p >
                                                    <BoardIcon />
                                                    <span>+ Create New Board</span>
                                                </p>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                    </SidebarMenu>
                                </SidebarGroupContent>
                                <div>

                                    {/* Toggle section */ }
                                    <div className=" w-11/12 h-12 sticky mb-16 left-3 z-10 bg-Lf4f7fd dark:bg-L20212c rounded-lg ">
                                        <Toggle />
                                    </div>

                                </div>
                            </div>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

            </div>
            {/* Hide sidebar region */ }
            { sidebarIcon
                ? ( <div className="hidden sm:block relative w-4 h-4 sm:w-10/12">
                    <div className=" w-full absolute bottom-4 left-0 z-10 text-transform:capitalize flex items-center gap-1 pl-8 pr-4 py-1 text-L828fa3 text-base cursor-pointer active:text-white dark:hover:bg-white hover:bg-L635fc7/10 hover:text-L635fc7 active:bg-L635fc7 rounded-r-full">
                        <SidebarTrigger2 />
                    </div>
                </div> )
                : (
                    <div className="hidden sm:block w-4 h-4 relative sm:w-10/12">
                        <div className=" flex absolute sm:w-fit bottom-4 left-0 z-10 items-center gap-1 px-2 text-white bg-L635fc7 rounded-r-full cursor-pointer">
                            <SidebarTrigger />
                        </div>
                    </div>
                )
            }


        </div>
    )
}
