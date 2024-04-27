import {lazy, Suspense} from "react";

export const RegistAsync = lazy(() => import('./Regist.jsx'));


export const RegistLazy = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegistAsync />
        </Suspense>
    )
}