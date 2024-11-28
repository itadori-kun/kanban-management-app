"use client";
import { AppSidebar } from "@/components/app-sidebar"

import { useAppContext } from '@/context';
import EmptyDashboard from '@/components/emptyDashboard';
import { Header } from '@/components/header';

import { Card } from '@/components/card';
import { useEffect, useRef } from 'react';
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

  const { overlay, placeHolder, columns, fetchAllColumnData, fetchAllTaskData, handleCreateColumnsOverlay, boardId } = useAppContext();

  const mounted = useRef( false );

  useEffect( () => {

    mounted.current = true;

    fetchAllColumnData( 2 );
    fetchAllTaskData();
    return () => {
      mounted.current = false;
    };
  }, [ boardId ] );

  return (
    <div className="h-full overflow-y-hidden">
      <SidebarProvider >
        <AppSidebar />
        <SidebarInset className={ sidebarItems?.dataset?.state === 'expanded' ? 'w-calc' : 'w-screen' }>

          <Header />
          <div className="flex flex-1 flex-col">
            <div className="min-h-[100vh] flex-1 rounded-xl" >
              {/* Empty state with no column or task added to dashboard */ }
              <section className={ ` bg-Lf4f7fd p-6 dark:bg-black h-full overflow-scroll` }>

                { columns.length ? (
                  <article className='w-full h-full flex gap-6 items-start'>

                    <Card />

                    <section className='w-[280px] h-full'>
                      <div className='w-[280px] grid place-items-center bg-L828fa3/20 h-full rounded-md mt-10'>
                        <button className='h-inherit text-transform: capitalize text-2xl font-bold text-L828fa3 text-pretty cursor-pointer hover:text-L635fc7 dark:hover:text-L635fc7' onClick={ handleCreateColumnsOverlay }>
                          + New Column
                        </button>
                      </div>

                    </section>

                  </article>
                ) : (
                  //  Empty state with no column or task added to dashboard
                  <EmptyDashboard />
                ) }


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
          </div>
        </SidebarInset >
      </SidebarProvider >
    </div>
  )
}
