"use client";

import { createContext, useContext, useState } from "react";
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
        const url = await fetch( `http://localhost:4000/todo` )
        const response = await url.json()
        setCards( response )
    }
    const cardComponentId = async ( taskId: string ) => {
        const urlGet = await fetch( `http://localhost:4000/todo/${ taskId }` )
        const response = await urlGet.json()
        setSingleCard( response )
    }


    return (
        <AppContext.Provider value={ {
            setOverlay,
            overlay,
            setPlaceHolder,
            placeHolder,
            cards,
            cardComponent,
            cardId,
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