import { useLoaderData } from "react-router-dom"
import axiosInstance from "../api/axios";

export default function FeesPage(){
    const loaderData = useLoaderData();

    return (
        <>
            <div className="py-4">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Fees</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"> {loaderData} </div>
                </main>
            </div>
        </>
    )
}

export async function loader(){
    return ( <div>Here will appear the financial responsibilities.</div> )

    /*
    const userID = localStorage.getItem('user');

    const res = await axiosInstance.post('/parents/', {task:"fetchFees", user: userID})
    return JSON.stringify(res.data);
    */

}