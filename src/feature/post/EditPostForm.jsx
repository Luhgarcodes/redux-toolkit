import { useState } from "react"
import { selectPostById, updatePost,deletePost } from "./postSlice"
import { useDispatch,useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"
import { useNavigate, useParams } from "react-router-dom"

const EditPostForm = () => {


    const {postId} = useParams()

    const users = useSelector(selectAllUsers)
    const post = useSelector(state => selectPostById(state,Number(postId)))

    if(!post){
        return <section>
            <h2>
                No Post Found
            </h2>
        </section>
    }
    const navigate = useNavigate()
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.body)
    const [userId, setUserId] = useState(post.userId)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const dispatch = useDispatch()
    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))

    const optionsMenu = users.map(user =>(
        <option key={user.id} value={user.id}>{user.name}</option>
    ))


    const saveBtn = [userId,content,title].every(Boolean) && addRequestStatus === 'idle' 

    const onSubmit = () => {
        if (saveBtn) {
            try{
                setAddRequestStatus('pending');
            dispatch(updatePost({id:post.id, title,body:content,userId,reactions:post.reactions})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/post/${postId}`)
            }catch(err){
                console.log('Failed',err);
            }finally{
                setAddRequestStatus('idle')
            }
        }
    }
    const onDeletePostClicked = () => {
        if (saveBtn) {
            try{
                setAddRequestStatus('pending');
            dispatch(deletePost({id:post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/`)
            }catch(err){
                console.log('Failed',err);
            }finally{
                setAddRequestStatus('idle')
            }
        }
    }

    return (<>
        <section>
            <h2>
                Edit Post
            </h2>
            <form >
                <label htmlFor="posttitle">Title</label>
                <input type="text" name="postTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="">Content</label>
                <input type="text" name="postContent" value={content} onChange={onContentChanged} />
                <label htmlFor="">Select User</label>
                <select type="text" name="postUserId" value={userId} onChange={onAuthorChanged} >
                    <option value=""></option>
                    {optionsMenu}
                    </select>
                <button disabled={!saveBtn} type="button" onClick={onSubmit}>Submit </button>
            <button className="deleteButton" type="button" onClick={onDeletePostClicked}>Delete Post </button>
            </form>
        </section>
    </>)
}

export default EditPostForm