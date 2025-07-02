import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { Suspense } from "react"
import { Dashboard } from "./pages/Dashboard.js";
const Signin = React.lazy(() => import('./pages/Signin.js'));
const Signup = React.lazy(() => import('./pages/Signup.js'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Suspense fallback={'loading'}><Signin /></Suspense>} />
          <Route path="/signup" element={<Suspense fallback={'loading'}><Signup /></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback={'loading'}><Dashboard /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App