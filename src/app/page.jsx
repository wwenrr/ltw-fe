import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function Page() {
    const headerlist = await headers()
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    if(!token)
        redirect('/login')

    else
        redirect('/home')
}