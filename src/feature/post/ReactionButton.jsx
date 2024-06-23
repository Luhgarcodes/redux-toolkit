import { useDispatch } from "react-redux"
import { reactionAdded } from "./postSlice"

const reactionEmoji = {
    thumbs:'👍',
    wow:'😍',
    heart:'❤',
}

const ReactionButton = ({post}) => {

    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
        return(
            <button key={name} type="button" className="reactionButton" onClick={()=>dispatch(reactionAdded({postId:post?.id,reaction:name}))}>
                {emoji}{post?.reactions[name]}
            </button>
        )
    })

  return (
    <span>
      {reactionButtons}
    </span>
  )
}

export default ReactionButton
