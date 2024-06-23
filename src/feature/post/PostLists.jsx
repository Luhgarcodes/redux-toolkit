import { useSelector } from "react-redux"
import { selectPostIds, getPostsStatus, getPostsError } from "./postSlice"
// import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postSlice"
import PostExcert from "./PostExcert"

const PostLists = () => {

    const orderedPostIds = useSelector(selectPostIds)
    // const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
    let content;

    if(postStatus === 'loading'){
        content=<p>Loading..........</p>
    }else if(postStatus === 'succeeded'){
        // const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        // content = orderPosts.map((post)=> <PostExcert key={post.id} post={post}/>);
        content = orderedPostIds.map((post)=> <PostExcert key={post.id} postId={post}/>);
    }else if(postStatus === 'falied'){
        content=<p>Error..........</p>  
    }

 

    return (<>
        <section>
            {content}
        </section>
    </>)
}

export default PostLists