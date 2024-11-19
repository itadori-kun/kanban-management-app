"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

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
        .min( 2, {
            message: "Username must be at least 2 characters.",
        } )
        .max( 30, {
            message: "Username must not be longer than 30 characters.",
        } ),
    columns: z
        .array(
            z.object( {
                value: z.string(),
            } )
        )
        .optional(),
} )

type editBoardValues = z.infer<typeof editBoardSchema>

// This can come from your database or API.
const defaultValues: Partial<editBoardValues> = {
    columns: [
        { value: "Todo" },
        { value: "Doing" },
        { value: "Done" },
    ],
}

type editBoardProps = {
    // Define your props here
    header: string | "edit board",
    text: string | "save changes"
};

export function EditBoard( props: editBoardProps ) {

    const form = useForm<editBoardValues>( {
        resolver: zodResolver( editBoardSchema ),
        defaultValues,
        mode: "onChange",
    } )

    const { fields, append } = useFieldArray( {
        name: "columns",
        control: form.control,
    } )

    function onSubmit( data: editBoardValues ) {
        console.log( JSON.stringify( data, null, 2 ), 'data' )
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
                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Board Name</FormLabel>
                                    <FormControl className="px-4 py-3 h-fit text-sm font-medium ">
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
                                    name={ `columns.${ index }.value` }
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className={ `${ cn( index !== 0 && "sr-only" ) } text-xs font-bold text-L828fa3 dark:text-white` }>
                                                Board Columns
                                            </FormLabel>
                                            <div className="flex gap-4 items-center mb-3">
                                                <FormControl className="px-4 py-3 h-fit text-sm font-medium">
                                                    <Input { ...field } />
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
