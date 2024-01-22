import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../ui/LoginPage'

export const App = () => {
    return (
        <div className="container-lg">
            <Routes>
                {/* <Route path="/" element={<InicioPage />} /> */}
                <Route path="login" element={<LoginPage />} />
                {/* <Route path="/*" element={<EgresadosRoutes />} /> */}
            </Routes>
        </div>
    )
}
