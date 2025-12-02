import ProfileFrame from "../assets/ProfileFrame.png";
import Temp from "../assets/Temp.png";
import Reviews from "./Reviews";
import data from "../../public/data.json"
import BannerRed from "../assets/BannerRed.png"
import CoursesTaughtComponent from "./CoursesTaughtComponent";

function SearchResults() {
    //Temp data
    const professorName = "Dr. John Smith";
    const distinctCourseNames = new Set();

    data.forEach(user => {
        user.reviews.forEach(review => {
            if (review.professorName === professorName) {
                distinctCourseNames.add(review.courseName);
            }
        });
    });


    const professorReviews = data.flatMap(user =>
        user.reviews.filter(review => review.professorName === professorName)
    );

    // 2. Calculate Totals
    let totalRatingsCount = professorReviews.length;
    let totalStarSum = 0;

    professorReviews.forEach(review => {
        totalStarSum += review.rating;
    });

    // 3. Calculate Average
    const averageStarRating = totalRatingsCount > 0
        ? (totalStarSum / totalRatingsCount).toFixed(1) // ToFixed(1) keeps one decimal place
        : 0;

    return (
        <>
            <div className="bg-[rgb(141,89,29)] p-4 text-white">temp nav bar</div>
            <div className="bg-[rgb(224,202,148)] flex w-[90vw] h-[70vh] items-center mx-auto mt-25 space-x-10 rounded-xl">
                <div className="w-[100vh] relative flex justify-center items-center">
                    <img
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] h-auto"
                        src={ProfileFrame}
                        alt="Profile Frame"
                    />
                    <img
                        className="w-[80%] h-auto mx-auto relative z-0"
                        src={Temp}
                        alt="Overlay Content"
                    />
                </div>

                <div className=" w-[80vh] h-[50vh]">
                    <img
                        className="w-full h-auto"
                        src={BannerRed}
                        alt="Banner"
                    />
                    {/* Star Rating */}
                    <div className=" w-[40vh]">
                        {/* Star Rating Display Area */}
                        <div className="p-4 flex flex-col items-center justify-center">

                            {/* Average Star Rating */}
                            <h3 className="text-4xl font-extrabold text-gray-800">
                                {averageStarRating} / 5.0
                            </h3>

                            <div className="text-3xl text-yellow-500 my-2">
                                {'⭐'.repeat(Math.floor(averageStarRating))}
                                {'☆'.repeat(5 - Math.floor(averageStarRating))}
                            </div>

                            {/* Total Rating Count */}
                            <p className="text-sm text-gray-600">
                                Based on {totalRatingsCount} reviews
                            </p>

                        </div>

                        {/* ... Courses Taught section follows ... */}
                    </div>

                    <h3 className="font-black">Courses Taught:</h3>
                    <div className=" flex flex-wrap p-4 space-x-4 overflow-y-scroll h-[20vh]">
                        {/* Convert the Set to an array for mapping in JSX */}
                        {[...distinctCourseNames].map((courseName) => (
                            <div key={courseName} className="w-[calc(33.333%-1rem)] mb-4">
                                <CoursesTaughtComponent
                                    courseName={courseName}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="w-[80vh] h-[50vh] border-2 border-black mx-auto shadow-xl overflow-hidden">
                    <h2 className="text-[35px] font-bold p-4">Ratings & Reviews</h2>
                    <div className="overflow-y-auto h-[40vh] p-4">
                        {data.map((user, uIndex) => (
                            user.reviews.map((review, rIndex) => (
                                <Reviews
                                    key={`${uIndex}-${rIndex}`} // Use uIndex (user index) and rIndex (review index) for a unique key
                                    name={user.name}
                                    courseName={review.courseName}
                                    date={review.date}
                                    professorName={review.professorName}
                                    comment={review.comment}
                                />
                            )
                            ))
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default SearchResults;