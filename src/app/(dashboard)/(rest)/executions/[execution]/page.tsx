import { requireAuth } from "@/lib/auth.utils"

interface Pageprops{
    params:Promise<{execution:string}>
}
const Page = async  ({params}:Pageprops)=>{
    const execution = await params
    await requireAuth()
    return(
        <div>
            <h1>execution:{execution.execution}</h1>
        </div>
    )
}
export default Page 