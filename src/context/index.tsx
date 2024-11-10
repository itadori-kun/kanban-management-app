"use client";

import { createContext, useContext, useState } from "react";
import { TaskForm } from "@/components/taskForm";
import { AddNewBoard } from "@/components/addNewBoard";
import { EditBoard } from "@/components/editNewBoard";
import { DeleteSection } from "@/components/deleteSection";
import { Todo } from "@/components/todo";


interface CardProps {
    id: string;
    title: string;
    subtasks: string[];
    status: string;
}

interface AppContextProps {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolder: JSX.Element;
    setPlaceHolder: React.Dispatch<React.SetStateAction<JSX.Element>>;
    cards: CardProps[];
    cardComponent: () => void;
    handleOverlayOpen: () => void;
    handleAddTask: () => void;
    handleAddBoard: () => void;
    handleEditBoard: () => void;
    handleDeleteBoard: ( header: string, text: string, type: string ) => void;
    handleEditTask: () => void;
    handleCloseOverlay: () => void;
}

const AppContext = createContext<AppContextProps>( {
    overlay: false,
    setOverlay: () => { },
    placeHolder: <></>,
    setPlaceHolder: () => { },
    cards: [],
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


    const [ overlay, setOverlay ] = useState<boolean>( false );
    const [ placeHolder, setPlaceHolder ] = useState<JSX.Element>( <></> );
    const [ cards, setCards ] = useState<CardProps[]>( [] );


    const handleOverlayOpen = (): void => {
        setPlaceHolder( <Todo /> );
        setOverlay( !overlay );
    }

    // This causes the overlay to be displayed when the edit task button is clicked so that further details can be selected
    const handleEditTask = (): void => {

        setPlaceHolder( <TaskForm header="Edit task" text='save changes' /> );
        // setOverlay( false );
    }

    // This causes the overlay to be displayed when the add task button is clicked so that further details can be selected
    const handleAddTask = (): void => {
        setPlaceHolder( <TaskForm header="Add new task" text='save changes' /> );
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

    const handleDeleteBoard = ( header: string, text: string, type: string ): void => {
        setPlaceHolder( <DeleteSection header={ header } text={ text } type={ type } /> );
        // setOverlay( !overlay )
    }

    const handleCloseOverlay = (): void => {
        setOverlay( false )
    }

    const cardComponent = async () => {
        await fetch( `http://localhost:4000/todo` ).then( res => res.json() ).then( data => {
            setCards( data );
        } );
    }



    return (
        <AppContext.Provider value={ {
            setOverlay,
            overlay,
            setPlaceHolder,
            placeHolder,
            cards,
            cardComponent,
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