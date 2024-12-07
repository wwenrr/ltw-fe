import { blue } from "@mui/material/colors";
import "@/assessts/styles/auth/layout.scss"

export default async function RootLayout({ children }) {
    return (
        <>
            <section>
                {children}
            </section>
        </>
    );
}