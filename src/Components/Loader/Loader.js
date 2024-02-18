import './Loader.css'

export const Loader = () => {
    return (
        <div className='fixed bg-white/50 top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center h-full'>
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}