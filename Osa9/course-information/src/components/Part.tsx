import type { JSX } from "react";
import type { CoursePart } from "../types";

type CoursePartListProps ={
    courseParts: CoursePart[]
};

/**
 * Helper function for exhaustive type checking
 */

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ courseParts }: CoursePartListProps): JSX.Element => {
    return (
        <div>
            {courseParts.map((part => {
                switch (part.kind) {
                    case "basic":
                        return(
                            <p key={part.name}>
                                <strong>{part.name} {part.exerciseCount}</strong>
                                <br/>
                                <i>{part.description}</i>
                            </p>
                        );
                    case "group":
                        return(
                            <p key={part.name}>
                            <strong>{part.name} {part.exerciseCount}</strong>
                            <br/>
                            project exercises {part.groupProjectCount}
                            </p>
                        );
                    case "background":
                        return(
                           <p key={part.name}>
                            <strong>{part.name} {part.exerciseCount}</strong>
                            <br/>
                            <i>{part.description}</i>
                            <br/>
                            {part.backgroundMaterial}
                           </p> 
                        )
                    case "special":
                        return(
                           <p key={part.name}>
                            <strong>{part.name} {part.exerciseCount}</strong>
                            <br/>
                            <i>{part.description}</i>
                            <br/>
                            required skils: {part.requirements.toString()}
                           </p> 
                        )
                    default:
                        return assertNever(part);
      
                }
            }))}
        </div>
    );
};

export default Part;
