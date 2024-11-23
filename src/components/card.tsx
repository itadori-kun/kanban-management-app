
import { useAppContext } from '@/context';
import { useEffect, useRef } from 'react';



export function Card() {

    const { handleOverlayOpen, fetchAllColumnData, fetchAllTaskData, tasks, columns, cardComponentId, setStatus, boardId } = useAppContext();
    const mounted = useRef( false );



    useEffect( () => {
        // Had to use component mount and the card dependency to manipulate the DOM anytime the card state changes

        mounted.current = true;
        fetchAllColumnData( boardId );
        fetchAllTaskData();
        return () => {
            mounted.current = false;
        };
    }, [ tasks ] );


    return (
        <>
            { columns.map( ( column ) => {
                const filteredTasks = tasks.filter( task => task.column_id === column.id && task.project_id === boardId )
                return (
                    <section className='w-[280px]' key={ column.id }>
                        {/* column heading */ }
                        <div className='w-[280px] mb-6 flex items-center gap-3'>
                            <div className='w-4 h-4 rounded-full bg-[#49c4e5]'></div>
                            <h3 className='text-transform: uppercase tracking-widest text-xs font-bold text-L828fa3'>{ `${ column.name } (${ filteredTasks.length })` }</h3>
                        </div>

                        {/* card section where they are populated */ }
                        <ul className="w-[280px]">
                            { filteredTasks.map( ( task ) => (
                                <li className=' w-full px-4 py-6 shadow-sm bg-white dark:bg-L2b2c37 rounded-md mb-5 text-pretty cursor-pointer hover:text-L635fc7 text-black dark:text-white dark:hover:text-L635fc7' onClick={ () => {
                                    setStatus( column.name )
                                    cardComponentId( task.id )

                                    handleOverlayOpen()
                                } } key={ task.id }>
                                    <h2 className='font-bold text-base text-inherit mb-2 first-letter:uppercase'>{ task.title }</h2>
                                    <p className='font-bold text-xs text-L828fa3'>0 of { task.subtasks.length } subtasks</p>
                                </li>
                            ) ) }

                        </ul>

                    </section> )
            } ) }


        </>
    )
}