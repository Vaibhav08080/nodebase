import { requireAuth } from "@/lib/auth.utils"

interface Pageprops{
    params:Promise<{credentialId:string}>
}
const Page = async  ({params}:Pageprops)=>{
    await requireAuth()
    const credentialId = await params
    return(
        <div>
            <h1>credentialId:{credentialId.credentialId}</h1>
        </div>
    )
}
export default Page 