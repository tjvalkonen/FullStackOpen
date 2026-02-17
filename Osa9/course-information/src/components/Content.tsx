
import type { CoursePart } from "../types";
import Part from "./Part";

type CoursePartListProps ={
    courseParts: CoursePart[]
};

const Content = ({ courseParts }: CoursePartListProps) => {  
  return <div><Part courseParts={courseParts}/></div>
};

export default Content;