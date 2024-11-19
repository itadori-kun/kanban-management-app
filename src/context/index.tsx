"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { TaskForm } from "@/components/taskForm";
import { AddNewBoard } from "@/components/addNewBoard";
import { EditBoard } from "@/components/editNewBoard";
import { DeleteSection } from "@/components/deleteSection";
import { Todo } from "@/components/todo";
import { EditTaskForm } from "@/components/editTaskForm";


interface CardProps {
    id: string;
    title: string;
    description: string;
    subtasks: { value: string }[];
    column_id: string;
}

interface Column {
    id: string;
    name: string;
    project_id: string;
}
interface Task {
    id: string;
    title: string;
    description: string;
    subtasks: { value: string }[];
    column_id: string;
}

interface AppContextProps {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolder: JSX.Element;
    setPlaceHolder: React.Dispatch<React.SetStateAction<JSX.Element>>;
    cards: CardProps[];
    cardId: string;
    width: string;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    singleCard: CardProps;
    projects: [];
    columns: Column[];
    tasks: Task[];
    fetchAllData: () => void;
    cardComponentId: ( taskId: string ) => void;
    handleOverlayOpen: () => void;
    handleAddTask: () => void;
    handleAddBoard: () => void;
    handleEditBoard: () => void;
    handleDeleteBoard: ( header: string, text: string, type: string, id: string ) => void;
    handleEditTask: () => void;
    handleCloseOverlay: () => void;
}

const AppContext = createContext<AppContextProps>( {
    overlay: false,
    setOverlay: () => { },
    placeHolder: <></>,
    setPlaceHolder: () => { },
    cards: [],
    cardId: "",
    width: "",
    singleCard: {
        id: "",
        title: "",
        description: "",
        subtasks: [],
        column_id: ""
    },
    status: '',
    setStatus: () => { },
    projects: [],
    columns: [],
    tasks: [],
    setCardId: () => { },
    cardComponentId: () => { },
    fetchAllData: () => { },
    handleOverlayOpen: () => { },
    handleAddTask: () => { },
    handleAddBoard: () => { },
    handleEditBoard: () => { },
    handleDeleteBoard: () => { },
    handleEditTask: () => { },
    handleCloseOverlay: () => { },
} );

export function AppWrapper( { children }: { children: React.ReactNode } ) {
    const [ singleCard, setSingleCard ] = useState<CardProps>( {
        id: "",
        title: "",
        description: "",
        subtasks: [],
        column_id: ""
    } )

    const [ overlay, setOverlay ] = useState<boolean>( false );
    const [ placeHolder, setPlaceHolder ] = useState<JSX.Element>( <></> );
    const [ cards, setCards ] = useState<CardProps[]>( [] );
    const [ cardId, setCardId ] = useState( "" )
    const [ width, setWidth ] = useState<string>( 'w-calc' );
    const [ projects, setProjects ] = useState<[]>( [] );
    const [ columns, setColumns ] = useState<Column[]>( [] );
    const [ tasks, setTasks ] = useState<Task[]>( [] );
    const [ status, setStatus ] = useState<string>( '' )



    const handleOverlayOpen = (): void => {
        setPlaceHolder( <Todo /> );
        setOverlay( !overlay );

    }

    // This causes the overlay to be displayed when the edit task button is clicked so that further details can be selected
    const handleEditTask = (): void => {

        setPlaceHolder( <EditTaskForm /> );
        // setOverlay( false );
    }

    // This causes the overlay to be displayed when the add task button is clicked so that further details can be selected
    const handleAddTask = (): void => {
        setPlaceHolder( <TaskForm /> );
        setOverlay( !overlay );
    }

    // this causes the placeholder on the page.tsx to rerender and populate when the "create new board" button is clicked
    const handleAddBoard = (): void => {
        setPlaceHolder( <AddNewBoard header='add new board' text='create new board' /> );
        setOverlay( !overlay )
    }

    const handleEditBoard = (): void => {
        setPlaceHolder( <EditBoard header='edit board' text='save changes' /> );
        setOverlay( !overlay )
    }

    const handleDeleteBoard = ( header: string, text: string, type: string, id: string ): void => {
        setPlaceHolder( <DeleteSection header={ header } text={ text } type={ type } id={ id } /> );
        // setOverlay( !overlay )
    }

    const handleCloseOverlay = (): void => {
        setOverlay( false )
    }

    const fetchAllData = async () => {
        try {
            const [ projectsRes, columnsRes, taskRes ] = await Promise.all( [ fetch( `http://localhost:4000/projects` ), fetch( `http://localhost:4000/columns` ), fetch( `http://localhost:4000/tasks` ) ] );
            const [ projects, columns, task ] = await Promise.all( [ projectsRes.json(), columnsRes.json(), taskRes.json() ] );
            // return { projects, columns, task }
            setProjects( projects );
            setColumns( columns );
            setTasks( task );


            // setCards( response );
        } catch ( error ) {
            console.error( 'Error fetching data:', error );
        }
    }
    const cardComponentId = async ( taskId: string ) => {
        const urlGet = await fetch( `http://localhost:4000/tasks/${ taskId }` )
        const response = await urlGet.json()
        if ( !response || Object.keys( response ).length === 0 ) {
            throw new Error( 'Failed to fetch data' )
        }
        setSingleCard( response )
    }

    useEffect( () => {
        const sidebarItems = document.querySelector( '.group' ) as HTMLElement;

        const updateWidth = () => {
            if ( sidebarItems.dataset.state === 'expanded' ) {
                setWidth( 'w-calc' );
                // setNavLogoDisplay( navLogoDisplay );
            } else {
                setWidth( 'w-screen' );
                // setNavLogoDisplay( !navLogoDisplay );
            }


        };


        updateWidth(); // Initial check

        const observer = new MutationObserver( updateWidth );
        observer.observe( sidebarItems, { attributes: true, attributeFilter: [ 'data-state' ] } );

        return () => observer.disconnect(); // Cleanup on unmount
    }, [ width ] );




    return (
        <AppContext.Provider value={ {
            setOverlay,
            overlay,
            setPlaceHolder,
            placeHolder,
            cards,
            fetchAllData,
            cardId,
            width,
            setCardId,
            singleCard,
            projects,
            columns,
            tasks,
            status,
            setStatus,
            cardComponentId,
            handleOverlayOpen,
            handleAddTask,
            handleAddBoard,
            handleEditBoard,
            handleDeleteBoard,
            handleEditTask,
            handleCloseOverlay,
        } }>
            { children }
        </AppContext.Provider>
    );

}

export function useAppContext() {
    return useContext( AppContext );
}