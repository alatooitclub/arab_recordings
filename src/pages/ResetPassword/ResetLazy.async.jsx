import {lazy, Suspense} from "react";

export const ResetAsync = lazy(() => import('./ResetPassword.jsx'));


export const ResetLazy = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetAsync />
        </Suspense>
    )
}