"use client";

import { createContext, useContext, useState } from "react";
import { TaskForm } from "@/components/taskForm";
import { AddNewBoard } from "@/components/addNewBoard";
import { EditBoard } from "@/components/editNewBoard";
import { DeleteSection } from "@/components/deleteSection";
import { Todo } from "@/components/todo";
import { EditTaskForm } from "@/components/editTaskForm";
import { AddNewColumn } from "@/components/addNewColumn";
import { DeleteBoard } from "@/components/deleteBoard";


interface CardProps {
    id: string;
    title: string;
    description: string;
    subtasks: { value: string }[];
    column_id: string;
    project_id: string;
}

interface Projects {
    id: string;
    title: string;
    url: string;
    icon: string;
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
    project_id: string;
}
interface SingleBoard extends Projects {
    columns: Column[];
}
interface AppContextProps {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolder: JSX.Element;
    setPlaceHolder: React.Dispatch<React.SetStateAction<JSX.Element>>;
    cardId: string;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    boardId: string;
    setBoardId: React.Dispatch<React.SetStateAction<string>>;
    singleCard: CardProps;
    singleBoard: Projects;
    projects: Projects[];
    columns: Column[];
    allColumns: Column[];
    tasks: Task[];
    fetchAllBoardData: () => void;
    fetchAllSingleBoardData: ( e: number | string ) => void;
    fetchAllColumnData: ( e: number | string ) => void;
    fetchAllColumns: () => void;
    fetchAllTaskData: () => void;
    cardComponentId: ( taskId: string ) => void;
    handleOverlayOpen: () => void;
    handleAddTask: () => void;
    handleAddBoard: () => void;
    handleEditBoard: () => void;
    handleDeleteTask: ( header: string ) => void;
    deleteAllTask: () => void;
    handleDeleteBoard: ( header: string ) => void;
    handleEditTask: () => void;
    handleCloseOverlay: () => void;
    handleCreateColumnsOverlay: () => void;
}

const AppContext = createContext<AppContextProps>( {
    overlay: false,
    setOverlay: () => { },
    placeHolder: <></>,
    setPlaceHolder: () => { },
    cardId: "",
    singleCard: {
        id: "",
        title: "",
        description: "",
        subtasks: [],
        column_id: "",
        project_id: ""
    },
    singleBoard: {
        id: '',
        title: '',
        url: '',
        icon: ''
    },
    status: '',
    boardId: '',
    setBoardId: () => { },
    setStatus: () => { },
    projects: [],
    columns: [],
    allColumns: [],
    tasks: [],
    setCardId: () => { },
    cardComponentId: () => { },
    fetchAllBoardData: () => { },
    fetchAllSingleBoardData: () => { },
    fetchAllColumns: () => { },
    fetchAllColumnData: () => { },
    fetchAllTaskData: () => { },
    handleOverlayOpen: () => { },
    handleAddTask: () => { },
    handleAddBoard: () => { },
    handleEditBoard: () => { },
    handleDeleteBoard: () => { },
    handleDeleteTask: () => { },
    deleteAllTask: () => { },
    handleEditTask: () => { },
    handleCloseOverlay: () => { },
    handleCreateColumnsOverlay: () => { },
} );

export function AppWrapper( { children }: { children: React.ReactNode } ) {
    const [ singleCard, setSingleCard ] = useState<CardProps>( {
        id: "",
        title: "",
        description: "",
        subtasks: [],
        column_id: "",
        project_id: ""
    } )

    const [ singleBoard, setSingleBoard ] = useState<SingleBoard>( {
        id: '',
        title: '',
        url: '',
        icon: '',
        columns: [
            {
                id: '',
                name: '',
                project_id: ''
            }
        ]
    } )
    const [ overlay, setOverlay ] = useState<boolean>( false );
    const [ placeHolder, setPlaceHolder ] = useState<JSX.Element>( <></> );
    const [ cardId, setCardId ] = useState( "" )
    const [ projects, setProjects ] = useState<Projects[]>( [] );
    const [ columns, setColumns ] = useState<Column[]>( [] );
    const [ allColumns, setAllColumns ] = useState<Column[]>( [] );
    const [ tasks, setTasks ] = useState<Task[]>( [] );
    const [ status, setStatus ] = useState<string>( "Todo" )
    const [ boardId, setBoardId ] = useState<string>( '' )



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

    const handleDeleteBoard = ( header: string ): void => {
        setPlaceHolder( <DeleteBoard header={ header } /> );
        setOverlay( !overlay );
    }

    const handleDeleteTask = ( header: string ): void => {
        setPlaceHolder( <DeleteSection header={ header } /> );
        // setOverlay( !overlay )
    }

    const handleCloseOverlay = (): void => {
        setOverlay( false )
    }

    const handleCreateColumnsOverlay = async () => {
        setPlaceHolder( <AddNewColumn /> );
        setOverlay( !overlay )
    };

    const fetchAllBoardData = async () => {
        try {
            const projectsRes = await fetch( `http://localhost:4000/projects` );
            const projects = await projectsRes.json();

            setProjects( projects );

        } catch ( error ) {
            console.error( 'Error fetching data:', error );
        }
    }
    const fetchAllSingleBoardData = ( e: string | number ) => {
        // flatten the columns object to an array
        const flattenColumn = Object.keys( columns ).filter( key => !isNaN( Number( key ) ) ).map( key => {
            const columnKey = Number( key );
            return {
                id: ( columnKey + 1 ).toString(),
                name: columns[ columnKey ].name,
                project_id: columns[ columnKey ].project_id
            };
        } );
        // filter the projects array to get the project with the id that matches the id passed in the function
        const filterProjects = projects.filter( ( project: Projects ) => project.id === e );
        // use a spread operator to combine the filtered project with the flatten column array. Since the filtered project is always going to be at the first index, we hardcode the value when spreading the object
        const combineBoardAndColumn = { ...filterProjects[ 0 ], columns: flattenColumn }
        // set the single board state to the combined object
        setSingleBoard( combineBoardAndColumn );

    }

    const fetchAllColumns = async () => {
        try {
            const columnsRes = await fetch( `http://localhost:4000/columns` );
            const columns = await columnsRes.json();

            setAllColumns( columns );

        } catch ( error ) {
            console.error( 'Error fetching data:', error );
        }
    }

    const fetchAllColumnData = async ( e: string | number ) => {
        try {
            const columnsRes = await fetch( `http://localhost:4000/columns/${ e }` );

            // Check if the response is OK 
            if ( !columnsRes.ok ) {
                throw new Error( `Error: ${ columnsRes.status } ${ columnsRes.statusText }` );
            }
            const columns = await columnsRes.json();

            const flattenColumn = Object.keys( columns ).filter( key => !isNaN( Number( key ) ) ).map( key => ( {
                id: ( parseInt( key ) + 1 ).toString(),
                name: columns[ key ].name,
                project_id: columns[ key ].project_id
            } )
            )

            setColumns( flattenColumn );

        } catch ( error ) {
            console.error( 'Error fetching data:', error );
        }
    }

    const fetchAllTaskData = async () => {
        try {
            const taskRes = await fetch( `http://localhost:4000/tasks` );
            const task = await taskRes.json();

            setTasks( task );

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

    const deleteAllTask = async () => {
        try {
            // Fetch all task by it's matching project id
            const response = await fetch( `http://localhost:4000/tasks/?project_id=${ boardId }` );
            // Check if the response is ok
            if ( !response.ok ) {
                throw new Error( `Task response status: ${ response.status }` );
            }
            // Convert the response to json
            const tasks = await response.json();

            // Map through the tasks and delete each task by it's id
            const deleteTasks = tasks.map( ( task: { id: string | number } ) => {
                fetch( `http://localhost:4000/tasks/${ task.id }`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } );

            } );
            // Await the deleteTasks
            const deleteResponse = await Promise.all( deleteTasks );
            // Check if the response is ok for each individual task
            deleteResponse.forEach( ( response: Response, index: number | string ) => {
                if ( !response.ok ) {
                    console.error( `Failed to delete task with ID ${ tasks[ index ].id }: ${ response.status }` );
                }
            } );
        } catch ( error ) {
            console.error( 'Error deleting tasks:', error );
            return;
        }
    }






    return (
        <AppContext.Provider value={ {
            boardId,
            setBoardId,
            setOverlay,
            overlay,
            setPlaceHolder,
            placeHolder,
            fetchAllBoardData,
            fetchAllSingleBoardData,
            singleBoard,
            fetchAllColumnData,
            fetchAllColumns,
            fetchAllTaskData,
            cardId,
            setCardId,
            singleCard,
            projects,
            columns,
            allColumns,
            tasks,
            status,
            setStatus,
            cardComponentId,
            handleOverlayOpen,
            handleAddTask,
            handleAddBoard,
            handleEditBoard,
            handleDeleteBoard,
            handleDeleteTask,
            deleteAllTask,
            handleEditTask,
            handleCloseOverlay,
            handleCreateColumnsOverlay
        } }>
            { children }
        </AppContext.Provider>
    );

}

export function useAppContext() {
    return useContext( AppContext );
}