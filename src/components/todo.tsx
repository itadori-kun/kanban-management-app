"use client"

import { useAppContext } from "@/context"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { EllipsisVertical } from "lucide-react"

import {
    Select,
    // SelectContent,
    // SelectGroup,
    // SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




export function Todo() {

    const { handleDeleteTask, handleEditTask, singleCard, status } = useAppContext();

    return (
        <section className='w-full h-full grid place-items-center px-2 sm:px-0'>

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <div className='flex justify-between items-center mb-6'>

                    <h2 className='text-black dark:text-white font-bold text-lg first-letter:text-transform: capitalize'>
                        { singleCard?.title }

                        {/* Research pricing points of various competitors and trial different business models */ }
                    </h2>
                    {/* <EllipsisVertical className='text-L828fa3 size-11' /> */ }

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <EllipsisVertical className='cursor-pointer text-L828fa3 size-6' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52 p-2">

                            <DropdownMenuItem className='cursor-pointer font-medium text-sm text-L828fa3 hover:text-L828fa3' onClick={ () => {
                                handleEditTask()
                            } }>
                                <span>Edit Task</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className='cursor-pointer text-Lea5555 font-medium text-sm hover:text-Lea5555' onClick={ () => handleDeleteTask( singleCard.title ) }>
                                <span>Delete Task</span>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

                <div className='mb-6'>

                    <p className='text-sm text-L828fa3 first-letter:text-transform: capitalize'>
                        { singleCard.description }
                    </p>

                </div>

                <div>

                    <h3 className='text-L828fa3 mb-4 dark:text-white'>Subtasks (2 of 3)</h3>

                    <form>

                        <ul className="mb-6">
                            { singleCard.subtasks.map( ( subtask, index ) => (
                                <li className="flex items-center space-x-2 p-2 bg-L635fc7/15 w-full gap-4 rounded-sm mb-2" key={ index }>
                                    <Checkbox id="terms" className='accent-L635fc7 w-4 h-4 bg-white' checked />
                                    <Label htmlFor="terms" className='font-bold text-xs text-black line-through text-L828fa3'>
                                        { subtask.value }
                                    </Label>
                                </li>
                            ) ) }

                        </ul>

                        <div>

                            <p className="text-L828fa3 mb-2 text-xs dark:text-white">Current Status</p>

                            <Select aria-labelledby="current status">
                                <SelectTrigger className="w-full text-L828fa3 text-sm text-black border-L828fa3/25 dark:text-white text-transform: capitalize">
                                    <SelectValue placeholder={ status } />
                                </SelectTrigger>
                                {/* <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="todo">Todo</SelectItem>
                                        <SelectItem value="doing">Doing</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectGroup>
                                </SelectContent> */}
                            </Select>

                        </div>

                    </form>

                </div>

            </div>

        </section >

    )
}
