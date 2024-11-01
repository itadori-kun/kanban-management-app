"use client";
import { useEffect, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { useTheme } from "next-themes";


import { DarkLogo } from "@/components/icons/darkLogo"
import { LightLogo } from "@/components/icons/lightLogo"

import { Todo } from '@/components/todo';
// import EmptyDashboard from '@/components/emptyDashboard';

export default function Home() {

  const { theme, systemTheme } = useTheme();
  const [ width, setWidth ] = useState<string>( 'w-[calc(100vw-255px)]' );
  const [ navLogoDisplay, setNavLogoDisplay ] = useState<boolean>( false );
  const [ overlay, setOverlay ] = useState<boolean>( false );

  // This causes the overlay to be displayed when the card is clicked so that further details can be selected
  const handleOverlay = () => {
    setOverlay( !overlay );
  }


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
    <div className={ `h-dvh ${ width } overflow-hidden` }>

      <header className="px-6 flex items-center justify-between dark:bg-L2b2c37 bg-white h-24">

        <div className='flex items-center h-full'>
          {/* check to see if the sidebar is expanded so as to display the logo */ }
          { navLogoDisplay ? (
            <div className='h-full  flex items-center'>
              {/* check theme status to see what mode it is and then display appropriately */ }
              { ( theme || systemTheme ) === 'light' ? <DarkLogo /> : <LightLogo /> }

              <hr className='ml-8 mr-7 border-r-2 h-full ' />

            </div> ) : ( <></> ) }

          <h1 className="text-transform: capitalize text-black dark:text-white font-bold text-2xl">Platform launch</h1>

        </div>

        <div className="flex items-center gap-4">

          {/* button is disabled since no column exist yet, no task can be added yet*/ }
          <button className="text-transform: capitalize rounded-full disabled:opacity-25 bg-L635fc7 px-6 py-4 text-base font-bold text-white" disabled aria-disabled>
            + add new task
          </button>

          <EllipsisVertical className="text-L828fa3" />

        </div>

      </header>

      {/* Empty state with no column or task added to dashboard */ }
      <section className={ `${ width } h-screen  bg-Lf4f7fd p-6 dark:bg-black` }>

        <article className='flex gap-6 items-start'>

          <section className='w-1/5'>
            {/* column heading */ }
            <div className='mb-6 flex items-center gap-3'>
              <div className='w-4 h-4 rounded-full bg-[#49c4e5]'></div>
              <h3 className='text-transform: uppercase tracking-widest text-xs font-bold text-L828fa3'>Todo ( 4 )</h3>
            </div>

            {/* card section where they are populated */ }
            <ul>

              {/* We call the click function on the card so as to display the overlay */ }
              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5 text-pretty cursor-pointer' onClick={ handleOverlay }>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>build UI for onboarding flow</h2>
                <p className='font-bold text-xs text-L828fa3'>0 of 3 subtasks</p>
              </li>

              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white  mb-2 first-letter:uppercase'>build UI for onboarding flow</h2>
                <p className='font-bold text-xs text-L828fa3'>0 of 3 subtasks</p>
              </li>

              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>build UI for onboarding flow</h2>
                <p className='font-bold text-xs text-L828fa3'>0 of 3 subtasks</p>
              </li>
            </ul>

          </section>

          <section className='w-1/5'>

            {/* column heading */ }
            <div className='mb-6 flex items-center gap-3'>
              <div className='w-4 h-4 rounded-full bg-purple-400'></div>
              <h3 className='text-transform: uppercase tracking-widest text-xs font-bold text-L828fa3'>Doing ( 6 )</h3>
            </div>

            {/* card section where they are populated */ }
            <ul>
              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>researching pricing points of various competitors and trial different business model</h2>
                <p className='font-bold text-xs text-L828fa3'>1 of 3 subtasks</p>
              </li>

              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>researching pricing points of various competitors and trial different business model</h2>
                <p className='font-bold text-xs text-L828fa3'>1 of 3 subtasks</p>
              </li>

              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>researching pricing points of various competitors and trial different business model</h2>
                <p className='font-bold text-xs text-L828fa3'>1 of 3 subtasks</p>
              </li>
            </ul>

          </section>

          <section className='w-1/5'>

            {/* column heading */ }
            <div className='mb-6 flex items-center gap-3'>
              <div className='w-4 h-4 rounded-full bg-green-500'></div>
              <h3 className='text-transform: uppercase tracking-widest text-xs font-bold text-L828fa3'>Done ( 7 )</h3>
            </div>

            {/* card section where they are populated */ }
            <ul>
              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>conduct 5 wireframe tests</h2>
                <p className='font-bold text-xs text-L828fa3'>1 of 1 subtasks</p>
              </li>

              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>conduct 5 wireframe tests</h2>
                <p className='font-bold text-xs text-L828fa3'>1 of 1 subtasks</p>
              </li>

              <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5'>
                <h2 className='font-bold text-base text-black dark:text-white mb-2 first-letter:uppercase'>conduct 5 wireframe tests</h2>
                <p className='font-bold text-xs text-L828fa3'>1 of 1 subtasks</p>
              </li>
            </ul>

          </section>

          <section className='w-1/5'>
            <div className='grid place-items-center bg-L828fa3/20 h-screen rounded-md mt-10'>
              <button className='text-transform: capitalize text-2xl font-bold text-L828fa3'>
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
        <section className='w-full h-full bg-blend-overlay bg-L828fa3/25  z-40 grid place-items-center absolute top-0 left-0 cursor-pointer' onClick={ handleOverlay }>

          <Todo />

        </section>
      ) }

    </div>
  );
}
