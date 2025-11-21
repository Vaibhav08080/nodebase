import { requireAuth } from "@/lib/auth.utils"

interface Pageprops{
    params:Promise<{workflowId:string}>
}
const Page = async  ({params}:Pageprops)=>{
    await requireAuth()
    const workflowId = await params
    return(
        <div>
            <h1>workflowid:{workflowId.workflowId}</h1>
        </div>
    )
}
export default Page 