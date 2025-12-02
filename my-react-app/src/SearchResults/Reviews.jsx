import ReviewFrame from "../assets/ReviewFrame.png"

function Reviews(props) {

    return (
        <div
            className="relative w-full max-w-screen-lg mx-auto bg-no-repeat bg-center [image-rendering:pixelated] py-8 min-h-0 mb-5"
            style={{ 
                backgroundImage: `url(${ReviewFrame})`, 
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            }}
        >
            
            {/* 2. Content Div: Absolutely positioned to fit the inner area of the frame. */}
            <div 
                className="relative z-10 p-6 max-h-35 overflow-y-scroll mb-1"
            >
                <h3 className="font-bold">{props.courseName}</h3>
                <p>{props.date}</p>
                <p className="text-sm text-yellow-400">⭐⭐⭐⭐☆</p>
                
                {/* 3. Review Text Container: The scrollable part */}
                <div className="mt-2 text-gray-800">
                    <p className="mt-2">
                    {props.comment}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Reviews;