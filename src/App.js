
import { getComments , currentUser } from './components/database'
import { useState } from 'react';
import Comment from './components/comment';
function App() {
  let data = getComments() ;
  let [comments , setComments] = useState(data)
  let [currentuser , setcurrentUser] = useState(currentUser)
  let [content , setContent] =  useState("")
  let [activate , setActivate] = useState(false)


  // fix the textarea input should not be empty
  const addComment = ()=>{
    let newComment = {}
    newComment['id'] = Date.now()
    newComment['content'] = content
    newComment['createdAt'] = '5 days ago'
    newComment['score'] = 0 
    newComment['user'] = currentuser  
    newComment['replies'] =[] 
    comments.push(newComment) 
    setContent("") 
  }

  return (
    <div className="container">
      {comments.map((comment) => {
        return (
          <Comment comment={comment} key={comment.id} currentuser = {currentuser} setContent={setContent} setComments={setComments} comments={comments} setActivate = {setActivate} />
        )
      })}

      {/* form to post a comment*/}
      <div className="form" disabled={activate}  >
        <img className='profileimg' src={currentuser.image['png']} alt="" />
        <textarea disabled={activate} className='myinput' name="" id="" cols="30" value = {content} onChange={(e) => {setContent(e.target.value)}} rows="10" placeholder='Add a comment ...' ></textarea>
        <button className='sendbtn' disabled={activate} onClick={addComment} >SEND</button>
      </div>
    </div>
    )

}

export default App;
