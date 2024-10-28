"use client";
import { useEffect, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

export default function Home() {
  const [ width, setWidth ] = useState<string>( 'w-[calc(100vw-255px)]' );
  useEffect( () => {
    const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

    const updateWidth = () => {
      if ( sidebarItems.dataset.state === 'expanded' ) {
        setWidth( 'w-[calc(100vw-255px)]' );
      } else {
        setWidth( 'w-dvw' );
      }
      console.log( sidebarItems.dataset.state, 'checking state' );
    };

    updateWidth(); // Initial check

    const observer = new MutationObserver( updateWidth );
    observer.observe( sidebarItems, { attributes: true, attributeFilter: [ 'data-state' ] } );

    return () => observer.disconnect(); // Cleanup on unmount
  }, [] );

  return (
    <div className={ `h-dvh ${ width }` }>

      <header className="p-6 flex items-center justify-between dark:bg-L2b2c37 bg-white">
        <h1 className="text-transform: capitalize text-black dark:text-white font-bold text-2xl">Platform launch</h1>
        <div className="flex items-center gap-4">
          <button className="text-transform: capitalize rounded-full disabled:opacity-25 bg-L635fc7 px-6 py-4 text-base font-bold" disabled aria-disabled>
            + add new task
          </button>
          <EllipsisVertical className="text-L828fa3" />
        </div>
      </header>

      <section className={ `${ width } h-dvh grid place-items-center bg-Lf4f7fd` }>
        <div className='flex flex-col gap-8 items-center justify-center'>
          <p className="font-bold text-lg text-L828fa3">This board is empty. Create a new column to get started.</p>
          <button className="w-2/4 text-transform: capitalize rounded-full bg-L635fc7 p-4 text-base font-bold text-white">
            + add new column
          </button>
        </div>
      </section>

    </div>
  );
}
