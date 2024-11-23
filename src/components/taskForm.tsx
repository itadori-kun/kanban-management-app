"use client"

import { useAppContext } from "@/context"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"


import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const taskFormSchema = z.object( {
    title: z.string().min( 1, { message: "Can't be empty" } ),
    description: z.string().min( 2, {
        message: "Description must be at least 2 characters long",
    } ),
    subtasks: z
        .array(
            z.object( {
                value: z.string().min( 1, { message: "Can't be empty" } ),
            } )
        ),
    column_id: z.string(),
    project_id: z.string(),
} )

type TaskFormValues = z.infer<typeof taskFormSchema>

// This can come from your database or API.
const defaultValues: Partial<TaskFormValues> = {
    title: "",
    description: "",
    subtasks: [
        { value: "" },
    ],
    column_id: "",
    project_id: "",
}



export function TaskForm() {
    const { reset } = useForm()
    const { handleCloseOverlay, tasks, status, columns, boardId } = useAppContext()

    const form = useForm<TaskFormValues>( {
        resolver: zodResolver( taskFormSchema ),
        defaultValues,
        mode: "onChange",
    } )

    const { fields, append, remove } = useFieldArray( {
        name: "subtasks",
        control: form.control,
    } )

    async function onSubmit( data: TaskFormValues ) {

        // Determine the new unique `id` based on the highest existing id but we are using tasks since in the context we have tasks which carries the entire database data
        // const latestId = tasks.reduce( ( maxId: number, task: { id: string } ) => Math.max( maxId, parseInt( task?.id ) ), 1 );
        // const newId = latestId + 1;
        const taskIds = Object.keys( tasks ).map( Number ).filter( id => !isNaN( id ) );
        const newId = taskIds.length > 0 ? Math.max( ...taskIds ) + 1 : 1;

        // Add the new `id` to the data
        const newData = { ...data, id: newId.toString(), project_id: boardId };
        // convert the data to a string
        const dataFile = JSON.stringify( newData, null, 2 )

        // send the data to the server using a Post request
        const resp = await fetch( `http://localhost:4000/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataFile
        } );
        // check if the response is ok
        if ( !resp.ok ) {
            throw new Error( `Response status: ${ resp.status }` )
        }
        // reset the form and close the overlay
        reset()
        handleCloseOverlay()

    }

    return (
        <section className="w-full h-full grid place-items-center px-2 sm:px-0">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>
                <div className="flex justify-between">
                    <h2 className="text-transform: capitalize text-black dark:text-white font-bold text-lg mb-6">add new task</h2>
                    <X className="size-6 text-L828fa3 dark:text-Lea5555 transform hover:scale-150" onClick={ () => {
                        handleCloseOverlay()
                        reset()
                    }
                    } />
                </div>


                <Form { ...form }>
                    <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8 w-full">
                        <FormField
                            control={ form.control }
                            name="title"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Title</FormLabel>
                                    <FormControl className="px-4 py-3 h-fit text-sm font-medium">
                                        <Input placeholder="e.g. Take coffee break" { ...field } />
                                    </FormControl>
                                    <FormMessage className="text-Lea5555 text-xs" />
                                </FormItem>
                            ) }
                        />
                        {/* <span className="text-Lea5555 text-sm">Can&apos;t be empty</span> */ }
                        <FormField
                            control={ form.control }
                            name="description"
                            render={ ( { field } ) => (
                                <FormItem>

                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Description</FormLabel>
                                    <FormControl className="px-4 py-3 h-28 text-sm font-medium">
                                        <Textarea
                                            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
                                            className="resize-none"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage className="text-Lea5555 text-xs" />
                                </FormItem>
                            ) }
                        />
                        <div>
                            { fields.map( ( field, index ) => (
                                <FormField
                                    control={ form.control }
                                    key={ field.id }
                                    name={ `subtasks.${ index }.value` }
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className={ `${ cn( index !== 0 && "sr-only" ) } text-xs font-bold text-L828fa3 dark:text-white` }>
                                                Subtasks
                                            </FormLabel>
                                            <div className="flex gap-4 items-center mb-3 relative">
                                                <FormControl className="px-4 py-3 h-fit text-sm font-medium border-Lea5555 ">
                                                    <Input placeholder="e.g. Make coffee" { ...field } />
                                                </FormControl>
                                                <X className="text-L828fa3 dark:text-Lea5555 hover:scale-110 transform" onClick={ () => remove( index ) } />
                                            </div>
                                            <FormMessage className="text-Lea5555 text-xs" />
                                        </FormItem>
                                    ) }
                                />
                            ) ) }
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-3 w-full bg-L635fc7/10 text-L635fc7 dark:bg-white dark:text-L635fc7 text-sm font-bold rounded-full py-2 h-10 dark:hover:bg-white/70 hover:bg-L635fc7/70"
                                onClick={ () => append( { value: "" } ) }
                            >
                                + Add New Subtask
                            </Button>
                        </div>

                        <FormField
                            control={ form.control }
                            name="column_id"
                            render={ ( { field } ) => (
                                <FormItem>

                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Status</FormLabel>
                                    <Select aria-labelledby="current status" onValueChange={ field.onChange } defaultValue={ field.value }>
                                        <FormControl>
                                            <SelectTrigger className="w-full px-4 py-3 h-fit text-L828fa3 text-sm font-medium text-black border-L828fa3/25 dark:text-white">
                                                <SelectValue placeholder={ status } />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            { columns.map( column => (
                                                <SelectItem key={ column.id } value={ column.id }>{ column.name }</SelectItem>

                                            ) ) }
                                        </SelectContent>
                                    </Select>
                                    {/* <FormMessage /> */ }
                                </FormItem>
                            ) }
                        />
                        <Button type="submit" className="bg-L635fc7 text-white w-full rounded-full py-2 h-10 text-sm font-bold hover:bg-La8a4ff text-transform: capitalize">save changes</Button>
                    </form>

                </Form>

            </div>

        </section>

    )

}
