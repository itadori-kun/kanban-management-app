"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
// import { cn } from "@/lib/utils"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/context"
// import { X } from "lucide-react"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"


const newBoardSchema = z.object( {
    title: z
        .string()
        .min( 1, {
            message: "Cannot be empty",
        } ),
    url: z.string()
} )

type newBoardValues = z.infer<typeof newBoardSchema>

// This can come from your database or API.
const defaultValues: Partial<newBoardValues> = {
    title: "",
    url: "",
}

type newBoardProps = {
    // Define your props here
    header: string | "add new board",
    text: string | "create new board"
};

export function AddNewBoard( props: newBoardProps ) {
    const { reset } = useForm()
    const { projects, handleCloseOverlay } = useAppContext()

    const form = useForm<newBoardValues>( {
        resolver: zodResolver( newBoardSchema ),
        defaultValues,
        mode: "onChange",
    } )

    // const { fields, append } = useFieldArray( {
    //     name: "projects",
    //     control: form.control,
    // } )

    async function onSubmit( data: newBoardValues ) {

        // Determine the new unique `id` based on the highest existing id but we are using columns since in the context we have columns which carries the entire database data
        const latestId = projects.reduce( ( maxId: number, project: { id: string } ) => Math.max( maxId, parseInt( project?.id ) ), 1 );
        const newId = latestId + 1;

        const columnData = [ {
            title: "Todo",
            project_id: newId.toString()
        }, {
            title: "Doing",
            project_id: newId.toString()
        }, {
            title: "Done",
            project_id: newId.toString()
        } ]


        // Add the new `id` to the data
        const newData = { ...data, id: newId.toString(), url: data.title.trim().split( " " ).join( "_" ).toLowerCase() };

        const dataFile = JSON.stringify( newData, null, 2 )
        const columnDataFile = JSON.stringify( columnData, null, 2 )

        const resp = await fetch( `http://localhost:4000/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataFile
        } );


        const response = await fetch( `http://localhost:4000/columns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: columnDataFile
        } );
        // check if the response is ok
        if ( !resp.ok ) {
            throw new Error( `Response status: ${ resp.status }` )
        }
        if ( !response.ok ) {
            throw new Error( `Response status: ${ response.status }` )
        }
        // reset the form and close the overlay
        reset()
        handleCloseOverlay()

        // console.log( JSON.stringify( data, null, 2 ), 'data' )
        // console.log( JSON.stringify( columnDataFile, null, 2 ), 'dataFile column' )
    }

    return (
        <section className="w-full h-full grid place-items-center px-2 sm:px-0">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <h2 className="text-transform: capitalize text-black dark:text-white font-bold text-lg mb-6">{ props.header }</h2>

                <Form { ...form }>
                    <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8 w-full">
                        <FormField
                            control={ form.control }
                            name="title"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Title</FormLabel>
                                    <FormControl className="px-4 py-3 h-fit text-sm font-medium ">
                                        <Input placeholder="e.g. Web Design" { ...field } />
                                    </FormControl>
                                    <FormMessage className="text-Lea5555 text-xs" />
                                </FormItem>
                            ) }
                        />

                        {/* <div>
                            { fields.map( ( field, index ) => (
                                <FormField
                                    control={ form.control }
                                    key={ field.id }
                                    name={ `projects.${ index }.value` }
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className={ `${ cn( index !== 0 && "sr-only" ) } text-xs font-bold text-L828fa3 dark:text-white` }>
                                                projects
                                            </FormLabel>
                                            <div className="flex gap-4 items-center mb-3">
                                                <FormControl className="px-4 py-3 h-fit text-sm font-medium">
                                                    <Input placeholder="e.g. Make coffee" { ...field } />
                                                </FormControl>
                                                <X className="text-L828fa3" />
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
                                onClick={ () => append( { value: "" } ) }
                            >
                                + Add New project
                            </Button>
                        </div> */}


                        <Button type="submit" className="bg-L635fc7 text-white w-full rounded-full py-2 h-10 text-sm font-bold hover:bg-L635fc7/70 text-transform: capitalize">{ props.text }</Button>
                    </form>
                </Form>

            </div>

        </section>

    )

}
