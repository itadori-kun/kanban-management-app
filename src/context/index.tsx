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
    status: string;
}

interface AppContextProps {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolder: JSX.Element;
    setPlaceHolder: React.Dispatch<React.SetStateAction<JSX.Element>>;
    cards: CardProps[];
    cardId: string,
    width: string,
    navLogoDisplay: boolean,
    sidebarIcon: boolean,
    display: string,
    setCardId: React.Dispatch<React.SetStateAction<string>>,
    singleCard: CardProps,
    cardComponentId: ( taskId: string ) => void;
    cardComponent: () => void;
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
    navLogoDisplay: false,
    sidebarIcon: true,
    display: "block",
    singleCard: {
        id: "",
        title: "",
        description: "",
        subtasks: [],
        status: ""
    },
    setCardId: () => { },
    cardComponentId: () => { },
    cardComponent: () => { },
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
        status: ""
    } )

    const [ overlay, setOverlay ] = useState<boolean>( false );
    const [ placeHolder, setPlaceHolder ] = useState<JSX.Element>( <></> );
    const [ cards, setCards ] = useState<CardProps[]>( [] );
    const [ cardId, setCardId ] = useState( "" )
    const [ width, setWidth ] = useState<string>( 'w-[calc(100vw-16rem)]' );
    const [ navLogoDisplay, setNavLogoDisplay ] = useState<boolean>( false );
    const [ sidebarIcon, setSidebarIcon ] = useState<boolean>( true );
    const [ display, setDisplay ] = useState<string>( 'block' );


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

    const cardComponent = async () => {
        try {
            const url = await fetch( `http://localhost:4000/todo` );
            if ( !url.ok ) {
                throw new Error( `HTTP error! status: ${ url.status }` );
            }
            const response = await url.json();
            if ( !Array.isArray( response ) || !response.length ) {
                throw new Error( 'Failed to fetch data' );
            }
            setCards( response );
        } catch ( error ) {
            console.error( 'Error fetching data:', error );
        }
    }
    const cardComponentId = async ( taskId: string ) => {
        const urlGet = await fetch( `http://localhost:4000/todo/${ taskId }` )
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
                setWidth( 'sm:w-[calc(100vw-16rem)]' );
                setNavLogoDisplay( navLogoDisplay )
                setSidebarIcon( sidebarIcon );
                setDisplay( 'block' );
            } else {
                setWidth( 'sm:w-dvw' );
                setNavLogoDisplay( !navLogoDisplay )
                setSidebarIcon( !sidebarIcon );
                setDisplay( 'hidden' );
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
            cardComponent,
            cardId,
            width,
            navLogoDisplay,
            sidebarIcon,
            display,
            setCardId,
            singleCard,
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