"use client";


import { useAppContext } from '@/context';
import EmptyDashboard from '@/components/emptyDashboard';
import { Header } from '@/components/header';


import { Card } from '@/components/card';
import { useEffect, useRef } from 'react';



export default function Home() {

  const { overlay, placeHolder, columns, width, fetchAllData, handleCreateColumnsOverlay } = useAppContext();
  const mounted = useRef( false );

  useEffect( () => {
    mounted.current = true;
    fetchAllData();
    return () => {
      mounted.current = false;
    };
  }, [] );


  return (
    <div className={ width } id='container'>

      {/* Header section */ }
      <Header />


      {/* Empty state with no column or task added to dashboard */ }
      <section className={ `w-full bg-Lf4f7fd p-6 dark:bg-black h-[calc(100vh-110px)] overflow-hidden` }>

        <div className="overflow-hidden">
          { columns.length ? (
            <article className=' flex gap-6 items-start h-screen overflow-x-scroll'>

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
        </div>


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
