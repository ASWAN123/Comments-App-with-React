
import { getComments , currentUser } from './components/database'
import { useEffect, useState } from 'react';
import Comment from './components/comment';

function App() {
  let data = getComments() ;
  let [comments , setComments] = useState(data)
  let [currentuser , setcurrentUser] = useState(currentUser)
  let [content , setContent] =  useState("")
  let [activate , setActivate] = useState(false)
  let [removeNotiy , setRemoveNotify] = useState(['none' , 'Well done!' , 'You have successfully posted your comment.' , 'lightgreen'])
  


  // fix the textarea input should not be empty
  const addComment = ()=>{
    if(content !== ""){
      let newComment = {}
      newComment['id'] = Date.now()
      newComment['content'] = content
      newComment['createdAt'] = '5 days ago'
      newComment['score'] = 0 
      newComment['user'] = currentuser
      newComment['replies'] =[]
      comments.push(newComment)
      setContent("")
      setRemoveNotify(['block' , 'Well done!' , 'You have successfully posted your comment.' , 'lightgreen'])
      setTimeout(() =>{
        setRemoveNotify(['none'])
      }, 3000)
    }else{
      setRemoveNotify(['block' , 'what are you trying todo !' , 'You can not post empty comment.' , 'lightgreen'])
      setTimeout(() =>{
        setRemoveNotify(['none'])
      }, 3000)
  }
  }



  return (
    <div className="container">
      {/* notification div */}
      <div className='notification' style={{display: removeNotiy[0], backgroundColor:removeNotiy[3]}} ><span>{removeNotiy[1]}</span> {removeNotiy[2]}</div>

      {comments.map((comment) => {
        return (
          <Comment setRemoveNotify={setRemoveNotify} comment={comment} key={comment.id} currentuser = {currentuser} setContent={setContent} setComments={setComments} comments={comments} setActivate = {setActivate}  content={content}   />
        )
      })}

      {/* form to post a comment*/}
      <div className="form" disabled={activate}  >
        <img className='profileimg' src={currentuser.image['png']} alt="" />
        <textarea disabled={activate} className='myinput' name="" id="" cols="30" value = {content} onChange={(e) => {setContent(e.target.value)}} rows="10" placeholder='Add a comment ...' ></textarea>
        <button className='sendbtn' disabled={activate} onClick={()=>{
          if(content.length>0){
            addComment()
          }else{
            setRemoveNotify(['block' , 'OOPSS ! ' , 'You can not post empty comment.' , 'yellow'])
            setTimeout(() =>{
              setRemoveNotify(['none'])
            }, 3000)
        }
        }} >SEND</button>
      </div>
    </div>
    )

}

export default App;
