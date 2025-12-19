import Navbar from "../components/Navbar";



export const metadata = {
    title: "Happy Life Organization",
    description: "Improving lives through care, education, and community support",
};

export default function Mainayout({ children }) {
    return (

        <div>
            <Navbar />
            {children}
        </div>

    );
}
