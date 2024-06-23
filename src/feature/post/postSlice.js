import { createSlice, nanoid, createAsyncThunk,createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const apiUrl = 'https://jsonplaceholder.typicode.com/posts'


const postsAdapter = createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    // posts:[],
    error:null,
    status:'idle',
    count:0,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
    try{

        const response = await axios.get(apiUrl);
        return response.data

    }catch(err){
        return err.message
    }
})
export const addNewPosts = createAsyncThunk('posts/addNewPost',async(initialPosts)=>{
    try{
        const response = await axios.get(apiUrl,initialPosts);
        console.log(response.data);
        return initialPosts
    }catch(err){
        return err.message
    }
})
export const updatePost = createAsyncThunk('posts/updatePost',async(initialPosts)=>{
    const {id} = initialPosts;
    try{
        const response = await axios.put(`${apiUrl}/${id}`,initialPosts);
        return response.data
    }catch(err){
        return initialPosts 
    }
})
export const deletePost = createAsyncThunk('posts/deletePost',async(initialPosts)=>{
    const {id} = initialPosts;
    try{
        const response = await axios.put(`${apiUrl}/${id}`);
        if(response.status === 200) return initialPosts;
        return `${response.status} : ${response.statusText}`;
    }catch(err){
        return err.message
    }
})


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    //     postAdded: {
    //         reducer:(state,action) => {
    //         state.posts.push(action.payload);
    //     },
    //     prepare:(title,content,user)=>{
    //         return {
    //             payload:{
    //                 id:nanoid(),
    //                 title,
    //                 content,
    //                 date:new Date().toISOString(),
    //                 user,
    //                 reactions:{
    //                     thumbs:0,
    //                     wow:0,
    //                     heart:0,
    //                 }
    //             }
    //         }
    //     }
    // },
    reactionAdded(state,action){
        const {postId,reaction} = action.payload
        // const existingPost = state.posts.find(post => postId === post.id)
        const existingPost = state.entities[postId]
        
        if(existingPost){
            existingPost.reactions[reaction]++
        }
    },
    increasseCount(state,action){
      state.count = state.count+1  
    }
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            let min = 1;
            const loadedPosts = action.payload.map(post =>{
                post.date = sub(new Date(),{minutes:min++}).toISOString()
                post.reactions = {
                    thumbs:0,
                    wow:0,
                    heart:0,
                }
                return post
            })
            // state.posts = state.posts.concat(loadedPosts)
            // state.posts = loadedPosts
            postsAdapter.upsertMany(state,loadedPosts)

        }).addCase(fetchPosts.rejected,(state,action)=>{
            state.status ='failed',
            state.error = action.error.message
        }).addCase(addNewPosts.fulfilled,(state,action)=>{
            action.payload.id = nanoid()
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString()
            action.payload.reactions = {
                thumbs:0,
                wow:0,
                heart:0,
            }
            // state.posts.push(action.payload)
            postsAdapter.addOne(state,action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{

            if(!action.payload?.id){
                console.log('Update is incomplete');
                console.log(action.payload);
                return
            }
            const {id} = action.payload;
            action.payload.date = new Date().toISOString()
            const posts = state.posts.filter(post => post.id !== id)            
            // state.posts = [...posts,action.payload]
            postsAdapter.upsertOne(state,action.payload)
        }).addCase(deletePost.fulfilled,(state,action)=>{

            if(!action.payload?.id){
                console.log('Delete is incomplete');
                console.log(action.payload);
                return
            }
            const {id} = action.payload;
            // const posts = state.posts.filter(post => post.id !== id)            
            // state.posts = posts
            postsAdapter.removeOne(state,id)
        })


    }
})

// export const selectAllPosts = (state) => state.posts.posts
// export const selectPostById = (state,postId) => state.posts.posts.find(post => post.id === postId);
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count

export const {
    selectAll:selectAllPosts,
    selectById:selectPostById,
    selectIds:selectPostIds,
} = postsAdapter.getSelectors(state => state.posts)


export const selectPostByUser = createSelector([selectAllPosts,(state,userId)=>userId],
(posts,userId)=> posts.filter(post => post.userId === userId))


export const { increasseCount,reactionAdded } = postSlice.actions
export default postSlice.reducer