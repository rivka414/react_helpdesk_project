import React from 'react'
import './App.css'
import Login from './components/login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Footer from './components/footer'
import NewTicketForm from './components/newTicketForm'
import Header from './components/header'
import TicketDetails from './components/ticketDetails'
import TicketList from './components/ticketList'
import AddComments from './components/addComments'
import GuardRouter from './guards/guardRouter'
import ChangeStatus from './components/changeStatus'
import MoreUpdateTickect from './components/moreUpdateTicket'
import TicketToAgent from './components/ticketToAgent'
import ImportanceTickect from './components/importanceTicket'
import AddUser from './components/addUser'
import Error from './components/error'

function App() {


  return (
    <>



      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          path='/*'
          element={
            <GuardRouter>
              <Routes>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='footer' element={<Footer />} />

                <Route path='newTicketForm' element={<NewTicketForm />} />
                <Route path='header' element={<Header />} />
                <Route path='ticketList/:id' element={<TicketDetails />} />
                <Route path='ticketList' element={<TicketList />} />
                {/* <Route path='ticketList/:id' element={<TicketList />} /> */}
                <Route path='/addComments/:id' element={<AddComments />} />
                <Route path='/changeStatus/:id' element={<ChangeStatus />} />
                <Route path='/moreUpdateTicket/:id' element={<MoreUpdateTickect />} />
                <Route path='/importanceTicket/:id' element={<ImportanceTickect />} />
                <Route path='/ticketToAgent/:id' element={<TicketToAgent />} />
                <Route path='/addUser' element={<AddUser />} />
                <Route path='*' element={<Error />} />
              </Routes></GuardRouter>} />

      </Routes>
    </>
  )
}

export default App
