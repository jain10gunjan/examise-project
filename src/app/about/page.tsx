import { Advisors } from "./Advisors"
import { Firstcomponent } from "./Firstcomponent"
import { Secondlast } from "./Secondlast"
import { Thirdlast } from "./Thirdlast"
import { Timeline } from "./Timeline"

export const metadata = {
    title:"This is the meta data for the about page."
}

export default function About   (){
    return(
        <>
        <Firstcomponent/>
        <Timeline/>
        <Advisors/>
        <Thirdlast/>
        <Secondlast/>
        </>
    )
}