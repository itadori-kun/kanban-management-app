
export default function Home2( { params }: { params: { slug: string } } ) {
    return (
        <div>
            <h1>Hello, World! { params.slug }</h1>
        </div>
    );
}