"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useAppContext } from "@/context"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"


const editBoardSchema = z.object( {
    title: z
        .string()
        .min( 1, {
            message: "Cannot be Empty",
        } ).max( 20, {
            message: "Must be less than 20 characters",
        } ),
    columns: z
        .array(
            z.object( {
                name: z.string().min( 1, { message: "Cannot be Empty" } )
            } )
        )
} )

type editBoardValues = z.infer<typeof editBoardSchema>


type editBoardProps = {
    // Define your props here
    header: string | "edit board",
    text: string | "save changes"
};

export function EditBoard( props: editBoardProps ) {
    const { reset } = useForm()
    const { handleCloseOverlay, singleBoard, boardId } = useAppContext()

    const form = useForm<editBoardValues>( {
        resolver: zodResolver( editBoardSchema ),
        defaultValues: singleBoard || {},
        mode: "onChange",
    } )

    const { fields, append, remove } = useFieldArray( {
        name: "columns",
        control: form.control,
    } )

    async function deleteAllTaskInColumn( e: string | number ) {
        try {
            // Fetch all task by it's matching project id
            const response = await fetch( `http://localhost:4000/tasks?column_id=${ e }&project_id=${ boardId }` );
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

    async function onSubmit( data: editBoardValues ) {

        /*
        First restructure the sent data
        then set the new id and also change spacing of the url to underscore
        also map through the column data and set the project_id to the new id before sending to the database
        */

        const { columns, ...rest } = data;
        const setChildColumns = columns.flatMap( ( column, index ) => ( {
            ...column,
            project_id: singleBoard.id.toString(),
            id: ( index + 1 ).toString(),
        } ) );
        const newProject = {
            ...rest,
            id: singleBoard.id.toString(),
            url: rest.title.trim().split( " " ).join( "_" ).toLowerCase(),
        };
        const newColumns = { ...setChildColumns }



        const boardDataFile = JSON.stringify( newProject, null, 2 )
        const columnDataFile = JSON.stringify( newColumns, null, 2 )

        try {
            const [ projectResp, columnResp ] = await Promise.all( [
                fetch( `http://localhost:4000/projects/${ boardId }`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: boardDataFile
                } ),
                fetch( `http://localhost:4000/columns/${ boardId }`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: columnDataFile
                } )
            ] );

            if ( !projectResp.ok ) {
                throw new Error( `Project response status: ${ projectResp.status }` );
            }

            if ( !columnResp.ok ) {
                throw new Error( `Column response status: ${ columnResp.status }` );
            }
        } catch ( error ) {
            console.error( 'Error:', error );
            return;
        }

        // reset the form and close the overlay
        reset()
        handleCloseOverlay()

    }


    return (
        <section className="w-full h-full grid place-items-center px-2 sm:px-0">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <div className="flex justify-between">
                    <h2 className="text-transform: capitalize text-black dark:text-white font-bold text-lg mb-6">{ props.header }</h2>
                    <X className="size-6 text-L828fa3 dark:text-Lea5555 transform hover:scale-150" onClick={ () => {
                        handleCloseOverlay()
                        reset()
                    } } />
                </div>

                <Form { ...form }>
                    <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8 w-full">
                        <FormField
                            control={ form.control }
                            name="title"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Board Name</FormLabel>
                                    <FormControl className="px-4 py-3 h-fit text-sm font-medium  ">
                                        <Input placeholder="e.g. Board title" { ...field } />
                                    </FormControl>
                                </FormItem>
                            ) }
                        />

                        <div>
                            { fields.map( ( field, index ) => (
                                <FormField
                                    control={ form.control }
                                    key={ field.id }
                                    name={ `columns.${ index }.name` }
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className={ `${ cn( index !== 0 && "sr-only" ) } text-xs font-bold text-L828fa3 dark:text-white` }>
                                                Board Columns
                                            </FormLabel>
                                            <div className="flex gap-4 items-center mb-3">
                                                <FormControl className="px-4 py-3 h-fit text-sm font-medium">
                                                    <Input { ...field } />
                                                </FormControl>
                                                <X className="text-L828fa3 transform hover:scale-110" onClick={ () => {
                                                    singleBoard.columns.map( ( column ) => {
                                                        if ( column.name === field.value ) {
                                                            deleteAllTaskInColumn( column.id )
                                                        }
                                                    } )
                                                    remove( index )
                                                } } />
                                            </div>
                                        </FormItem>
                                    ) }
                                />
                            ) ) }
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-3 w-full bg-L635fc7/10 text-L635fc7 dark:bg-white dark:text-L635fc7 text-sm font-bold rounded-full py-2 h-10 dark:hover:bg-white/70 hover:bg-L635fc7/70"
                                onClick={ () => append( { name: "" } ) }
                            >
                                + Add New Column
                            </Button>
                        </div>


                        <Button type="submit" className="bg-L635fc7 text-white w-full rounded-full py-2 h-10 text-sm font-bold hover:bg-L635fc7/70 text-transform: capitalize">{ props.text }</Button>
                    </form>
                </Form>

            </div>

        </section>

    )

}
