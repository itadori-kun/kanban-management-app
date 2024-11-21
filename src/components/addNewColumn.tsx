"use client"

import { useAppContext } from "@/context"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const newColumnSchema = z.object( {
    name: z.string().min( 1, { message: "Can't be empty" } ),
    project_id: z.string(),
} )

type NewColumnValues = z.infer<typeof newColumnSchema>



export function AddNewColumn() {
    const { reset } = useForm()
    const { handleCloseOverlay, columns } = useAppContext()

    const form = useForm<NewColumnValues>( {
        resolver: zodResolver( newColumnSchema ),
        defaultValues: {
            name: "",
            project_id: '1'
        },
        mode: "onChange",
    } )



    async function onSubmit( data: NewColumnValues ) {

        // Determine the new unique `id` based on the highest existing id but we are using columns since in the context we have columns which carries the entire database data
        const latestId = columns.reduce( ( maxId: number, column: { id: string } ) => Math.max( maxId, parseInt( column?.id ) ), 1 );
        const newId = latestId + 1;

        // Add the new `id` to the data
        const newData = { ...data, id: newId.toString() };

        const dataFile = JSON.stringify( newData, null, 2 )

        const resp = await fetch( `http://localhost:4000/columns`, {
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
        <section className="w-full h-56 grid place-items-center px-2 sm:px-0">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <h2 className="text-transform: capitalize text-black dark:text-white font-bold text-lg mb-6">new column</h2>

                <Form { ...form }>
                    <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8 w-full">
                        <FormField
                            control={ form.control }
                            name="name"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Column Name</FormLabel>
                                    <FormControl className="px-4 py-3 h-fit text-sm font-medium">
                                        <Input placeholder="e.g. In Progress" { ...field } />
                                    </FormControl>
                                    <FormMessage className="text-Lea5555 text-xs" />
                                </FormItem>
                            ) }
                        />


                        <Button type="submit" className="bg-L635fc7 text-white w-full rounded-full py-2 h-10 text-sm font-bold hover:bg-La8a4ff text-transform: capitalize">create column</Button>
                    </form>
                </Form>

            </div>

        </section>

    )

}