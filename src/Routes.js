import React from "react"
import { Switch } from 'react-router-dom'
import RouterHandler from "./components/RouterHandler"

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import AdPage from './pages/AdPage'

export default () => {
    return (
        <Switch>
            <RouterHandler exact path="/">
            <Home />

            </RouterHandler>
            <RouterHandler exact path="/about">
            <About />
            </RouterHandler>
            <RouterHandler exact path="/signin">
            <SignIn />
            </RouterHandler> 
            <RouterHandler exact path="/signup">
            <SignUp />    
            </RouterHandler>
            <RouterHandler exact path="/ad/:id">
            <AdPage />    
            </RouterHandler>
            <RouterHandler private exact path="/post-an-ad">
            <About />    
            </RouterHandler>
            <RouterHandler path="*">
            <NotFound />
            </RouterHandler>
        </Switch>
    )
}