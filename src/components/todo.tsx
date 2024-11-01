"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { EllipsisVertical } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"




export function Todo() {

    return (
        <section className='w-full h-full grid place-items-center'>

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <div className='flex justify-between items-center mb-6'>

                    <h2 className='text-black dark:text-white font-bold text-lg'>Research pricing points of various competitors and trial different business models</h2>
                    <EllipsisVertical className='text-L828fa3 size-11' />

                </div>

                <div className='mb-6'>

                    <p className='text-sm text-L828fa3'>We know what we&apos;re planning to build for version one. Now we need to finalise the first pricing model we&apos;ll use. Keep iterating the subtasks until we have a coherent proposition.</p>

                </div>

                <div>

                    <h3 className='text-L828fa3 mb-4 dark:text-white'>Subtasks (2 of 3)</h3>

                    <form>

                        <ul className="mb-6">

                            <li className="flex items-center space-x-2 p-2 bg-L635fc7/15 w-full gap-4 rounded-sm mb-2">
                                <Checkbox id="terms" className='accent-L635fc7 w-4 h-4 bg-white' checked />
                                <Label htmlFor="terms" className='font-bold text-xs text-black line-through text-L828fa3'>Research competitor pricing and business model</Label>
                            </li>

                            <li className="flex items-center space-x-2 p-2 bg-L635fc7/15 w-full gap-4 rounded-sm mb-2">
                                <Checkbox id="terms" className='accent-L635fc7 w-4 h-4 bg-white' checked />
                                <Label htmlFor="terms" className='font-bold text-xs text-black line-through text-L828fa3'>Outline a business model that works for our solution</Label>
                            </li>

                            <li className="flex items-center space-x-2 p-2 bg-L635fc7/15 w-full gap-4 rounded-sm mb-2">
                                <Checkbox id="terms" className='accent-L635fc7 w-4 h-4 bg-white' />
                                <Label htmlFor="terms" className='font-bold text-xs text-black dark:text-white'>Talk to potential customers about proposed solution and ask for fair price expectancy</Label>
                            </li>

                        </ul>

                        <div>

                            <p className="text-L828fa3 mb-2 text-xs dark:text-white">Current Status</p>

                            <Select aria-labelledby="current status">
                                <SelectTrigger className="w-full text-L828fa3 text-sm text-black border-L828fa3/25 dark:text-white">
                                    <SelectValue placeholder="Doing" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="todo">Todo</SelectItem>
                                        <SelectItem value="doing">Doing</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>

                    </form>

                </div>

            </div>

        </section>

    )
}
