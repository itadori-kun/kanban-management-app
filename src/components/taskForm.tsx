"use client"

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
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const taskFormSchema = z.object( {
    title: z
        .string()
        .min( 2, {
            message: "Username must be at least 2 characters.",
        } )
        .max( 30, {
            message: "Username must not be longer than 30 characters.",
        } ),
    description: z.string().max( 160 ).min( 4 ),
    subtasks: z
        .array(
            z.object( {
                value: z.string(),
            } )
        )
        .optional(),
} )

type TaskFormValues = z.infer<typeof taskFormSchema>

// This can come from your database or API.
const defaultValues: Partial<TaskFormValues> = {
    description: "",
    subtasks: [
        { value: "" },
    ],
}

export function TaskForm() {
    const form = useForm<TaskFormValues>( {
        resolver: zodResolver( taskFormSchema ),
        defaultValues,
        mode: "onChange",
    } )

    const { fields, append } = useFieldArray( {
        name: "subtasks",
        control: form.control,
    } )

    function onSubmit( data: TaskFormValues ) {
        console.log( JSON.stringify( data, null, 2 ), 'data' )
    }

    return (
        <section className="w-full h-full grid place-items-center">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <h2 className="text-transform: capitalize text-black dark:text-white font-bold text-lg mb-6">add new task</h2>

                <Form { ...form }>
                    <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8 w-full">
                        <FormField
                            control={ form.control }
                            name="title"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Title</FormLabel>
                                    <FormControl className="px-4 py-3 h-fit text-sm font-medium ">
                                        <Input placeholder="e.g. Take coffee break" { ...field } />
                                    </FormControl>
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="title"
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
                                + Add New Subtask
                            </Button>
                        </div>

                        <FormField
                            control={ form.control }
                            name="title"
                            render={ ( { field } ) => (
                                <FormItem>

                                    <FormLabel className="text-xs font-bold text-L828fa3 dark:text-white">Status</FormLabel>
                                    <Select aria-labelledby="current status">
                                        <FormControl>
                                            <SelectTrigger className="w-full px-4 py-3 h-fit text-L828fa3 text-sm font-medium text-black border-L828fa3/25 dark:text-white">
                                                <SelectValue placeholder="Todo" { ...field } />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="todo">Todo</SelectItem>
                                                <SelectItem value="doing">Doing</SelectItem>
                                                <SelectItem value="done">Done</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </FormItem>
                            ) }
                        />
                        <Button type="submit" className="bg-L635fc7 text-white w-full rounded-full py-2 h-10 text-sm font-bold hover:bg-L635fc7/70">Create Task</Button>
                    </form>
                </Form>

            </div>

        </section>

    )

}
