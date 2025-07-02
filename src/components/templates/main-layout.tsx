import { Outlet } from 'react-router-dom'
import Header from '../molecules/Header'

export default function Layout() {
    // const navigation = useNavigation();
    // // const isLoading = navigation.state === "loading";

    return (
        <>
            <Header />
            <main>
                 <Outlet />
            </main>
        </>
    )
}
