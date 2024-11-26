'use client';
import { useTheme } from "next-themes";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";

import { DarkLogo } from "@/components/icons/darkLogo";
import { LightLogo } from "@/components/icons/lightLogo";
import { MobileLogo } from "@/components/icons/mobileLogo";

import { ChevronDown, EllipsisVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useParams } from "next/navigation";



export function Header() {

    const params = useParams();
    // Remove any spacing from the params and replace with underscore but first convert to a string and then trim any whitespaces before splitting by underscore and joining with space. This will escape the tsx typeerror.
    const transformedParams = params.slug?.toString().trim().split( "_" ).join( " " )

    // Call the useTheme hook to get the theme and systemTheme
    const { theme, systemTheme } = useTheme();

    // Destructure the columns, handleAddTask, handleEditBoard, and handleDeleteBoard from the useAppContext hook
    const { columns, handleAddTask, handleEditBoard, handleDeleteBoard } = useAppContext();

    // Set the navLogoDisplay to false
    const [ navLogoDisplay, setNavLogoDisplay ] = useState<boolean>( false );


    // useEffect to check if the sidebar is expanded and then display the logo

    useEffect( () => {
        const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

        const updateWidth = () => {
            if ( sidebarItems.dataset.state === 'expanded' ) {
                setNavLogoDisplay( navLogoDisplay );
            } else {
                setNavLogoDisplay( !navLogoDisplay );
            }

        };


        updateWidth(); // Initial check

        const observer = new MutationObserver( updateWidth );
        observer.observe( sidebarItems, { attributes: true, attributeFilter: [ 'data-state' ] } );

        return () => observer.disconnect(); // Cleanup on unmount
    }, [] );


    return (
        <header className={ `px-6 flex items-center justify-between dark:bg-L2b2c37 bg-white h-24` }>

            <div className='flex items-center h-full '>
                {/* check to see if the sidebar is expanded so as to display the logo */ }
                { navLogoDisplay ? (
                    <div className='h-full  flex items-center'>
                        {/* check theme status to see what mode it is and then display appropriately */ }
                        { systemTheme === "light" || theme === 'light' ? ( <><DarkLogo /><MobileLogo /></> ) : ( <><LightLogo /><MobileLogo /></> ) }

                        <hr className='ml-4 sm:ml-8 sm:mr-7 sm:border-r-2 sm:h-full ' />

                    </div> ) : ( <></> ) }
                <div className='flex gap-2 items-center'>
                    <h1 className="text-transform: capitalize text-black dark:text-white font-bold text-lg sm:text-xl md:text-2xl ">
                        { transformedParams }
                    </h1>
                    <span className='inline-block sm:hidden items-center text-L635fc7'><ChevronDown className='size-4 ' />
                    </span>
                </div>

            </div>

            <div className="flex items-center w-fit sm:w-[440px] gap-2 justify-end">

                {/* button is disabled since no column exist yet, no task can be added yet*/ }
                { columns.length ? (
                    <button className="w-12 sm:w-fit text-transform: capitalize rounded-full bg-L635fc7 px-3 sm:px-6 sm:py-4 text-2xl sm:text-base font-bold text-white text-center" aria-disabled onClick={ handleAddTask }>
                        + <span className='hidden sm:inline'> add new task</span>
                    </button>
                ) : (
                    <button className="w-12 sm:w-fit text-transform: capitalize rounded-full bg-L635fc7/25 px-3 sm:px-6 sm:py-4 text-2xl sm:text-base font-bold text-white/25 text-center" aria-disabled onClick={ handleAddTask }>
                        + <span className='hidden sm:inline'> add new task</span>
                    </button>
                ) }


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVertical className='cursor-pointer ' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-4 mt-6 p-4">

                        <DropdownMenuItem className='cursor-pointer font-medium text-sm text-L828fa3 hover:text-L828fa3' onClick={ handleEditBoard }>
                            <span>Edit Board</span>
                        </DropdownMenuItem>
                        {/* change the last parameter for the deleteboard since this is outcode. */ }
                        <DropdownMenuItem className='cursor-pointer text-Lea5555 font-medium text-sm hover:text-Lea5555' onClick={ () => handleDeleteBoard( transformedParams ) }
                        >
                            <span>Delete Board</span>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </header>
    )
}
