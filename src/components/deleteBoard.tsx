
import { useAppContext } from "@/context";
import { Props } from "@/types/propsInterface";



export function DeleteBoard( props: Props ) {

    const { handleCloseOverlay, boardId, deleteAllTask } = useAppContext();


    const handleDelete = async () => {
        try {

            const [ projectResp, columnResp ] = await Promise.all( [

                fetch( `http://localhost:4000/projects/${ boardId }`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ),
                fetch( `http://localhost:4000/columns/${ boardId }`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } )

            ] );

            if ( !projectResp.ok && !columnResp.ok ) {
                throw new Error( `Project response status: ${ projectResp.status }, Column response status: ${ columnResp.status }` );
                return;
            }

        } catch ( error ) {
            console.error( 'Error deleting board:', error );
            return;
        }
    }

    const handleDeleteBoard = async () => {
        await deleteAllTask();
        await handleDelete();
        handleCloseOverlay();

    }




    return (
        <section className="w-full h-full grid place-items-center px-2 sm:px-0">

            <div className='max-w-[30rem] w-full rounded-md p-8 bg-white dark:bg-L20212c'>

                <h2 className="first-letter:capitalize text-Lea5555 font-bold text-lg mb-6">delete this Board?</h2>

                <p className="mb-6 font-medium text-sm text-L828fa3">
                    Are you sure you want to delete the <span className="text-transform: capitalize">&apos;{ props.header }&apos;</span> board? This action will remove all columns and task and cannot be reversed.
                </p>

                <div className="flex justify-between items-center gap-4">
                    <button className="bg-Lea5555 text-white rounded-full text-sm font-bold p-2 w-full hover:bg-Lff9898" onClick={ () => handleDeleteBoard() }>Delete</button>
                    <button className="bg-L635fc7/10 text-L635fc7 rounded-full text-sm font-bold p-2 w-full dark:bg-white  dark:hover:bg-white/90" onClick={ handleCloseOverlay }>Cancel</button>
                </div>

            </div>
            i
        </section>
    );
}

