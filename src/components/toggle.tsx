"use client"

import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DarkIcon } from "@/components/icons/darkIcon"
import { LightIcon } from "@/components/icons/lightIcon"

export function Toggle() {
    const { setTheme } = useTheme()

    const stateCheck = ( evt: React.MouseEvent<HTMLButtonElement> ) => {
        const target = evt.target as HTMLButtonElement;
        if ( target.dataset.state !== 'checked' ) {
            setTheme( "dark" );
        } else {
            setTheme( 'light' );
        }
    }

    return (
        <div className="flex items-center justify-center rounded-lg w-full h-full " >
            <div className="flex items-center space-x-4">
                <Label htmlFor="light"><LightIcon /></Label>
                <Switch onClick={ stateCheck } />
                <Label htmlFor="dark"><DarkIcon /></Label>
            </div>
        </div>
    )
}
