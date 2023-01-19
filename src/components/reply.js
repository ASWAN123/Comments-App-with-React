import React, { useEffect } from 'react'
import {useState} from 'react'
import {  BsFillReplyFill} from 'react-icons/bs';
import {  AiFillDelete , AiTwotoneEdit} from 'react-icons/ai';
function Reply(props) {
  
    let reply = props.reply ;
    let setComments = props.setComments ;
    let comments = props.comments ;
    let currentuser = props.currentuser ;
    let comment = props.comment ;
    let [replycontent , setReplycontent] =  useState("") ;
    let setActivate = props.setActivate ;
    let [editmode , setEditmode] = useState([false , 0 ]) ;
    let activate1 = props.activate1 ;

    const addScore = (commentID , target , replyID )=> {
        setComments(comments.map((comment)=>{
          if(comment.id === commentID){
              comment.replies.map((reply)=>{
                if(reply.id === replyID){
                  (target ==='-') ? reply.score -= 1 : reply.score+=1 ;
                  return reply
                }
                return reply
              })
          }
          return comment
        }))
    }

    
    const removeComment = (commentID , replyID )=> {
        setComments(comments.map((comment)=>{
        if(comment.id === commentID ){
            let x = comment.replies.filter(obj => obj.id !== replyID);
            comment.replies = x ;
            return comment
        }
        return comment
        }))
    }

    const showReplyform = (commentID , replyID )=> {
          setComments(comments.map((comment)=> {
            let newdata = { ...comment, showCommentReply : false }
            newdata.replies.forEach((reply)=> {
              if(newdata.id === commentID && reply.id === replyID){
                reply['showReplyReply'] = true ;
              }else{
                reply['showReplyReply'] = false ;
              }
            })
            return newdata 
    
          }))
    }

    const editComment = (commentID ,replyID , replyContent) => {
      setEditmode([true , commentID , replyID])
      setReplycontent(replyContent)
    }

    const update = (commentID, replyID)=> {
      setComments(comments.map((comment)=> {
        if(comment.id == commentID){

          let x =  comment.replies.map((reply)=> {
            if(reply.id == replyID){
              reply.content = replycontent ;
              return reply
            }
            return reply
          })

          comment.replies = x
          return comment
        }
        return comment
      }))
      setEditmode([false , 0 , 0 ])
      setReplycontent('')
    }



    const addReply = (commentID , replyingTo )=> {
        let newReply = {} ;
        setComments(comments.map((comment)=> {
          if(comment.id == commentID){
            let newReply = {'id':Date.now(),'content':replycontent ,'createdAt':'1 day ago' ,'score': 0 ,'user':currentuser ,'replyingTo':replyingTo ,'showReplyReply': false}
            comment.replies.push(newReply)
          }
          comment.replies.forEach((reply)=> {reply['showReplyReply']=false ;})
          comment['showCommentReply'] = false
          return comment
        }))
        setReplycontent("")
    }

    useEffect(()=>{
        if(replycontent.length > 0){
            setActivate(true)
        }else{
            setActivate(false)
        }
    },[replycontent])

    return (
        <div className='card' key={reply.id}>
            <div className='reply' >
                <div className='vote'>
                    <button onClick={()=> {addScore(comment.id ,'+' , reply.id)}} className='plus'>+</button>
                    <span>{reply.score}</span>
                    <button onClick={()=> {addScore(comment.id ,'-' , reply.id)}} className='minus'>−</button>
                </div>
                <div className='userinfo'>
                    <img className='profileimg' src={reply.user['image']['png']} alt="" />
                    <span className='username'>{reply.user['username']}</span>
                    {reply.user['username'] === currentuser.username && <div className='you'>you</div>}
                    <span className='createddate'>{reply.createdAt}</span>
                    {reply.user['username'] !== currentuser.username && <button className="replybtn" onClick={()=>{showReplyform(comment.id , reply.id)}} ><BsFillReplyFill/>Reply</button>}
                    {reply.user['username'] === currentuser.username && <div className="editstuff"><button onClick={()=>{removeComment(comment.id , reply.id)}} className='delete'><AiFillDelete />Delete</button>

                    <button onClick={()=>{editComment(comment.id , reply.id , reply.content)}} className='edit'><AiTwotoneEdit />Edit</button></div>}
                </div>
                {/* i am working here */}

                <div className='text1'>
                { editmode[0] === true &&  editmode[2] === reply.id && <div className='editform'><textarea className='myinput' disabled={activate1} name="" id="" cols="30" value = {"@"+reply.replyingTo+", "+replycontent} onChange={(e) => {setReplycontent(e.target.value.replace("@"+reply.replyingTo+", " ,''))}} rows="10" placeholder={'@'+reply.user['username']} ></textarea>  
                
                <button className='sendbtn'  disabled={activate1} onClick={() => {
                    if(replycontent.length>0){
                        update(comment.id , reply.id)
                    }else{
                        console.log('you can not add empty reply')
                    }
                    }} >update</button> </div>}
                    { (editmode[1] !== comment.id && editmode[2] !== reply.id) && <p className='content'><span className='replyto'>@{reply.replyingTo}</span> {reply.content}</p> }
                    
                </div>

            </div>
            { reply['showReplyReply']==true &&  <div  className="form">
                <img className='profileimg' src={currentuser.image['png']} alt="" />
                <textarea className='myinput' name="" id="" cols="30" value = {replycontent} onChange={(e) => {setReplycontent(e.target.value)}} rows="10" placeholder={reply.user['username']} ></textarea>
                <button className='sendbtn'  onClick={() => {
                    if(replycontent.length>0) {
                        addReply(comment.id , reply.user['username'])
                    }else{
                        console.log('you can not add empty reply')
                    }
                    }} >Reply</button>
            </div>}
        </div>
    )
}

export default Reply ; 
