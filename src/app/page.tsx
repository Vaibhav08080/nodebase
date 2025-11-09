import { requireAuth } from "@/lib/auth.utils";
import {caller} from "@/trpc/server"
const Page=async()=>{
    await requireAuth()
    const data = await caller.getUsers()
    return(
        <div>
            {data.map((user)=>(
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    )
}
export default Page
