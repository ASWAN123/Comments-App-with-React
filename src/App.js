import logo from './logo.svg';
import { getComments , currentUser } from './components/database'
import { useState } from 'react';

function App() {
  let [comments , setComments] = useState(getComments)
  let [currentuser , setcurrentUser] = useState(currentUser)
  let [content , setContent] =  useState("")
  let [replycontent , setReplycontent] =  useState("")
  
  const addComment = ()=>{
    let newComment = {} ;
    newComment['id'] =comments.length + 1 
    newComment['content'] = content
    newComment['createdAt'] = '5 days ago'
    newComment['score'] = 0 
    newComment['user'] = currentuser
    newComment['replies'] =[]
    comments.push(newComment)
    setContent("")
  }

  const addReply = (commentID , replyingTo , replyID)=> {
    let newReply = {} ;
    setComments(comments.map((comment)=> {
      if(comment.id == commentID){
        newReply['id'] = comment.replies.length + 1
        newReply['content'] = replycontent
        newReply['createdAt'] = '1 day ago'
        newReply['score'] = 0
        newReply['user'] = currentuser
        newReply['replyingTo'] = replyingTo
        console.log(replyingTo)
        if(comment.user['username'] !== replyingTo){
          comment.replies.unshift(newReply)
        }else{
          comment.replies.splice(replyID, 0 , newReply)
        }
      }
      comment.replies.forEach((reply)=> {reply['showReplyReply']=false ;})
      comment['showCommentReply'] = false
      return comment
    }))
    setReplycontent("")
  }



  const showform = (commentID)=>{
    setComments(comments.map((comment)=> {
      let newdata = { ...comment, showCommentReply : false }
      newdata.replies.forEach((reply)=> {reply['showReplyReply']=false ;})
      if(newdata.id === commentID){
        newdata['showCommentReply'] = true ;
        return newdata
      }
      return newdata
    }))
  }

  const showReplyform = (commentID , replyID )=> {
    setComments(comments.map((comment)=> {
      let newdata = { ...comment, showCommentReply : false }
      newdata.replies.forEach((reply)=> {
        if(newdata.id == commentID && reply.id == replyID){
          reply['showReplyReply'] = true ;
        }else{
          reply['showReplyReply'] = false ;
        }
      })
      return newdata 

    }))}


  return (
    <div className="container">
      {comments.map((comment) => {
        return (
          <div className='card' key={comment.id}>
            <div className='comment' key= {comment.id} >
              <div className='vote'>
                <span className='plus'>+</span>
                <span>{comment.score}</span>
                <span className='minus'>-</span>
              </div>
              <div className='userinfo'>
                <img className='profileimg' src={comment.user['image']['png']} alt="" />
                <span className='username'>{comment.user['username']}</span>
                {comment.user['username'] === currentuser.username && <div className='you'>you</div>}
                <span className='createddate'>{comment.createdAt}</span>
                {comment.user['username'] !== currentuser.username && <button className="replybtn" onClick={()=>{showform(comment.id)}} >Reply</button>}
                {comment.user['username'] === currentuser.username && <div className="editstuff"><button className='delete'>Delete</button><button className='edit'>Edit</button></div>}
              </div>
              <div className='text1'>
                <p className='content'>{comment.content}</p>
              </div>
            </div>
            {comment['showCommentReply']==true &&  <div className="form">
                  <img className='profileimg' src={currentuser.image['png']} alt="" />
                  <textarea className='myinput' name="" id="" cols="30" value = {replycontent} onChange={(e) => {setReplycontent(e.target.value)}} rows="10" placeholder={comment.user['username']} ></textarea>
                  <button className='sendbtn'  onClick={() => {addReply(comment.id , comment.user['username'])}} >Reply</button>
                </div>}
            {/* replies */}
            <div className='replies'>
              {comment.replies.map((reply)=> {
                  return (
                    <div className='card' key={reply.id}>
                      <div className='reply' >
                        <div className='vote'>
                          <span className='plus'>+</span>
                          <span>{reply.score}</span>
                          <span className='minus'>-</span>
                        </div>
                        <div className='userinfo'>
                          <img className='profileimg' src={reply.user['image']['png']} alt="" />
                          <span className='username'>{reply.user['username']}</span>
                          {reply.user['username'] === currentuser.username && <div className='you'>you</div>}
                          <span className='createddate'>{reply.createdAt}</span>
                          {reply.user['username'] !== currentuser.username && <button className="replybtn" onClick={()=>{showReplyform(comment.id , reply.id)}} >Reply</button>}
                          {reply.user['username'] === currentuser.username && <div className="editstuff"><button className='delete'>Delete</button><button className='edit'>Edit</button></div>}
                        </div>
                        <div className='text1'>
                          <p className='content'><span className='replyto'>@{reply.replyingTo}</span> {reply.content}</p>
                        </div>
                      </div>
                      {reply['showReplyReply']==true &&  <div key={comment.id} className="form">
                        <img className='profileimg' src={currentuser.image['png']} alt="" />
                        <textarea className='myinput' name="" id="" cols="30" value = {replycontent} onChange={(e) => {setReplycontent(e.target.value)}} rows="10" placeholder={reply.user['username']} ></textarea>
                        <button className='sendbtn'  onClick={() => {addReply(comment.id , reply.user['username'])}} >Reply</button>
                      </div>}
                    </div>
                  )
                
              })}
            </div>
            {/* {comment['showCommentReply']==true &&  <div className="form">
                  <img className='profileimg' src={currentuser.image['png']} alt="" />
                  <textarea className='myinput' name="" id="" cols="30" value = {replycontent} onChange={(e) => {setReplycontent(e.target.value)}} rows="10" placeholder={comment.user['username']} ></textarea>
                  <button className='sendbtn'  onClick={() => {addReply(comment.id , comment.user['username'])}} >Reply</button>
                </div>} */}
          </div>
          
        )
      })}

      {/* form to post a comment*/}
      <div className="form">
        <img className='profileimg' src={currentuser.image['png']} alt="" />
        <textarea className='myinput' name="" id="" cols="30" value = {content} onChange={(e) => {setContent(e.target.value)}} rows="10" placeholder='Add a comment ...' ></textarea>
        <button className='sendbtn'  onClick={addComment} >SEND</button>
      </div>
    </div>
    )

}

export default App;
