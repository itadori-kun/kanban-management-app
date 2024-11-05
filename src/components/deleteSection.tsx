
type Props = {
    // Define your props here
    header: string,
    text: string | "",
    type: string | "board" | "task",
};

export function DeleteSection( props: Props ) {
    return (
        <section className="w-full h-full grid place-items-center">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <h2 className="first-letter:capitalize text-Lea5555 font-bold text-lg mb-6">{ `delete this ${ props.header }?` }</h2>

                <p className="mb-6 font-medium text-sm text-L828fa3">
                    Are you sure you want to delete the { `'${ props.text }' ${ props.type === "task" ? 'task and its subtasks' : props.type }` }? This action { `${ props.type === "board" ? 'will remove all columns and task and' : '' }` } cannot be reversed.
                </p>

                <div className="flex justify-between items-center gap-4">
                    <button className="bg-Lea5555 text-white rounded-full text-sm font-bold p-2 w-full hover:bg-Lff9898">Delete</button>
                    <button className="bg-L635fc7/10 text-L635fc7 rounded-full text-sm font-bold p-2 w-full dark:bg-white  dark:hover:bg-white/90">Cancel</button>
                </div>

            </div>

        </section>
    );
}

