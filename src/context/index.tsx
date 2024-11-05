"use client";

import { createContext, useContext, useState } from "react";
import { TaskForm } from "@/components/taskForm";
import { AddNewBoard } from "@/components/addNewBoard";
import { EditBoard } from "@/components/editNewBoard";
import { DeleteSection } from "@/components/deleteSection";

const AppContext = createContext( {
    overlay: false,
    setOverlay: {},
    placeHolder: <></>,
    setPlaceHolder: {},
    handleOverlay: () => { },
    handleAddTask: () => { },
    handleAddBoard: () => { },
    handleEditBoard: () => { },
    handleDeleteBoard: ( header: string, text: string, type: string ) => {
        header: header;
        text: text;
        type: type
    },
} );

export function AppWrapper( { children }: { children: React.ReactNode } ) {


    const [ overlay, setOverlay ] = useState<boolean>( false );
    const [ placeHolder, setPlaceHolder ] = useState<JSX.Element>( <></> );

    // This causes the overlay to be displayed when the edit task button is clicked so that further details can be selected
    const handleOverlay = (): void => {
        setPlaceHolder( <TaskForm header="Edit task" text='save changes' /> );
        setOverlay( !overlay );
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
        setOverlay( !overlay )
    }



    return (
        <AppContext.Provider value={ {
            setOverlay,
            overlay,
            setPlaceHolder,
            placeHolder,
            handleOverlay,
            handleAddTask,
            handleAddBoard,
            handleEditBoard,
            handleDeleteBoard,
        } }>
            { children }
        </AppContext.Provider>
    );

}

export function useAppContext() {
    return useContext( AppContext );
}