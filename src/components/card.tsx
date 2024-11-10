
import { useAppContext } from '@/context';
import { useEffect, useRef } from 'react';



export function Card() {

    const { handleOverlayOpen, cardComponent, cards } = useAppContext();
    const mounted = useRef( false );



    useEffect( () => {
        // Had to use component mount and the card dependency to manipulate the DOM anytime the card state changes

        mounted.current = true;
        cardComponent();
        return () => {
            mounted.current = false;
        };
    }, [ cards ] );



    return (
        <>
            { mounted.current && (
                <section className='w-1/5' >
                    {/* column heading */ }
                    <div className='mb-6 flex items-center gap-3'>
                        <div className='w-4 h-4 rounded-full bg-[#49c4e5]'></div>
                        <h3 className='text-transform: uppercase tracking-widest text-xs font-bold text-L828fa3'>Todo ( 4 )</h3>
                    </div>

                    {/* card section where they are populated */ }
                    <ul>
                        { cards.length > 0 && cards.map( ( card ) => (
                            <li className='px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5 text-pretty cursor-pointer hover:text-L635fc7 text-black dark:text-white dark:hover:text-L635fc7' onClick={ () => {
                                handleOverlayOpen(),
                                console.log( card.id )
                            }
                            } key={ card.id }>
                                <h2 className='font-bold text-base text-inherit mb-2 first-letter:uppercase'>{ card.title }</h2>
                                <p className='font-bold text-xs text-L828fa3'>0 of { card.subtasks.length } subtasks</p>
                            </li>
                        ) ) }

                    </ul>

                </section>
            ) }
        </>
    )
}