
function CoursesTaughtComponent(props) {

    return (
        <div className="border-2 border-black shadow-xl max-w-35 max-h-35 p-4 text-[15px] m-1">
            <h2 className=" font-bold">{props.courseName}</h2>
        </div>
    );

}

export default CoursesTaughtComponent;