import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import './index.css'
import { fetchUsers } from './feature/users/usersSlice.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchPosts } from './feature/post/postSlice.js'

store.dispatch(fetchPosts()); 
store.dispatch(fetchUsers()); 

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>
          <Route path='/*' element={<App />}></Route>
      </Routes>
    </Router>
  </Provider>
  // </React.StrictMode>,
)
