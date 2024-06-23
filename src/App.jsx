
// import { useState } from 'react'
// import Counter from './feature/counter/Counter'
import PostLists from './feature/post/PostLists'
import AddPostForm from './feature/post/AddPostForm'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import SinglePagePost from './feature/post/SinglePagePost'
import EditPostForm from './feature/post/EditPostForm'
import UserLists from './feature/users/UserLists'
import UserPage from './feature/users/UserPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<PostLists />} />

        <Route path='post'>
          <Route index element={<AddPostForm/>}/>
          <Route path=':postId' element={<SinglePagePost />}/>
          <Route path='edit/:postId' element={<EditPostForm />}/>
        </Route>

        <Route path='user'>
          <Route index element={<UserLists/>}/>
          <Route path=':userId' element={<UserPage />}/>
        </Route>

        <Route path='*' element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  )
}

export default App
