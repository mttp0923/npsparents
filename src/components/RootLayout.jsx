import HeaderNavigation from "./HeaderNavigation";

export default function RootLayout({ children }){
    return (
        <>
        <HeaderNavigation />
        <main>{ children }</main>
        </>
    )
}