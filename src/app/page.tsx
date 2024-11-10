"use client";
import { useEffect, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { useTheme } from "next-themes";


import { DarkLogo } from "@/components/icons/darkLogo"
import { LightLogo } from "@/components/icons/lightLogo"

import { useAppContext } from '@/context';
// import EmptyDashboard from '@/components/emptyDashboard';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Card } from '@/components/card';



export default function Home() {

  const { overlay, placeHolder, handleAddTask, handleEditBoard, handleDeleteBoard } = useAppContext();

  const { theme, systemTheme } = useTheme();
  const [ width, setWidth ] = useState<string>( 'w-[calc(100vw-255px)]' );
  const [ navLogoDisplay, setNavLogoDisplay ] = useState<boolean>( false );


  useEffect( () => {

    const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

    const updateWidth = () => {
      if ( sidebarItems.dataset.state === 'expanded' ) {
        setWidth( 'w-[calc(100vw-255px)]' );
        setNavLogoDisplay( navLogoDisplay )
      } else {
        setWidth( 'w-dvw' );
        setNavLogoDisplay( !navLogoDisplay )
      }
    };

    updateWidth(); // Initial check

    const observer = new MutationObserver( updateWidth );
    observer.observe( sidebarItems, { attributes: true, attributeFilter: [ 'data-state' ] } );

    return () => observer.disconnect(); // Cleanup on unmount
  }, [] );


  return (
    <div className={ `h-dvh ${ width } overflow-hidden ` }>

      <header className="px-6 flex items-center justify-between dark:bg-L2b2c37 bg-white h-24 ">

        <div className='flex items-center h-full'>
          {/* check to see if the sidebar is expanded so as to display the logo */ }
          { navLogoDisplay ? (
            <div className='h-full  flex items-center'>
              {/* check theme status to see what mode it is and then display appropriately */ }
              { systemTheme === "light" || theme === 'light' ? <DarkLogo /> : <LightLogo /> }

              <hr className='ml-8 mr-7 border-r-2 h-full ' />

            </div> ) : ( <></> ) }

          <h1 className="text-transform: capitalize text-black dark:text-white font-bold text-2xl">Platform launch</h1>

        </div>

        <div className="flex items-center gap-4">

          {/* button is disabled since no column exist yet, no task can be added yet*/ }
          <button className="text-transform: capitalize rounded-full disabled:opacity-25 bg-L635fc7 px-6 py-4 text-base font-bold text-white" aria-disabled onClick={ handleAddTask }>
            + add new task
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4 mt-6 p-4">

              <DropdownMenuItem className='cursor-pointer font-medium text-sm text-L828fa3 hover:text-L828fa3' onClick={ handleEditBoard }>
                <span>Edit Board</span>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer text-Lea5555 font-medium text-sm hover:text-Lea5555' onClick={ () => handleDeleteBoard( 'board', 'UI', 'board' ) }>
                <span>Delete Board</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </header>


      {/* Empty state with no column or task added to dashboard */ }
      <section className={ `${ width }   bg-Lf4f7fd p-6 dark:bg-black overflow-y-auto` }>

        <article className='flex gap-6 items-start min-h-fit'>

          <Card />

          <section className='w-1/5'>
            <div className='grid place-items-center bg-L828fa3/20 h-screen rounded-md mt-10'>
              <button className='h-inherit text-transform: capitalize text-2xl font-bold text-L828fa3 text-pretty cursor-pointer hover:text-L635fc7 dark:hover:text-L635fc7'>
                + New Column
              </button>
            </div>

          </section>

        </article>

        {/* Empty state with no column or task added to dashboard */ }
        {/* <EmptyDashboard /> */ }

      </section>



      {/* ToDO  will later be moved to the components folder */ }
      { overlay && (

        // We call the click function on the overlay so as to close the overlay
        <section className='w-full h-full bg-blend-overlay bg-L828fa3/25  z-40 grid place-items-center absolute top-0 left-0 cursor-pointer' >

          {/* This is used to hold the props in placed based on the elements clicked and the function call on those elements  */ }
          { placeHolder }

        </section>
      ) }
      {/* ToDO  will later be moved to the components folder */ }

    </div>
  );
}
