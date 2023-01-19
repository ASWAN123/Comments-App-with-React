import React, { useEffect } from 'react' ;
import Reply from './reply';
import { useState } from 'react';
import {  BsFillReplyFill} from 'react-icons/bs';
import {  AiFillDelete , AiTwotoneEdit} from 'react-icons/ai';

function Comment(props) {
    let comment = props.comment ;
    let currentuser = props.currentuser ;
    let setComments = props.setComments ;
    let comments = props.comments ;
    let [replycontent , setReplycontent] =  useState("") ;
    let setActivate = props.setActivate ;
    let content = props.content ;
    let [activate1 , setActivate1] = useState(false) ;
    let [editmode , setEditmode] = useState([false , 0 ]) ;

    const removeComment = (commentID)=> {
        setComments( comments.filter(obj => obj.id !== commentID ))
    }

    const addReply = (commentID , replyingTo )=> {
        setComments(comments.map((comment)=> {
          if(comment.id == commentID){
            let newReply ={'id':Date.now(),'content':replycontent ,'createdAt':'1 day ago' ,'score': 0 ,'user':currentuser ,'replyingTo':replyingTo ,'showReplyReply': false }
            comment.replies.push(newReply)
          }
          comment.replies.forEach((reply)=> {reply['showReplyReply']=false ;})
          comment['showCommentReply'] = false
          return comment
        }))
        setReplycontent("")
    }



    const addScore = (commentID , target) => {
        setComments(comments.map((comment)=>{
          if(comment.id === commentID){
              (target ==='-') ? comment.score -= 1 : comment.score+=1 ;
            return comment
          }
          return comment
        }))
      }

    const showReplyform = (commentID )=> {
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

    useEffect(()=>{
        if(replycontent.length > 0){
            setActivate(true)
        }else{
            setActivate(false)
        }
    },[replycontent])

    useEffect(()=>{
        if(content.length > 0){
          setActivate1(true)
        }else{
          setActivate1(false)
        }
    }, [content])


    // WORKING  ON EDIT  THING
    const editComment = (commentID , commentContnet) => {
        setEditmode([true , commentID])
        setReplycontent(commentContnet)
    }

    const update = (commentID)=> {
        setComments(comments.map((comment) => {
            if(comment.id === commentID){
                comment.content = replycontent ;
                return comment
            }
            return comment
        }))
        setEditmode([false , 0])
        setReplycontent('')


    }



    return (
        <div className='card' key={comment.id} >
            <div className='comment' key= {comment.id} >
                <div className='vote'>
                    <button onClick={()=> {addScore(comment.id ,'+')}} className='plus'>+</button>
                    <span>{comment.score}</span>
                    <button onClick={()=> {addScore(comment.id ,'-')}} className='minus'>−</button>
                </div>
                <div className='userinfo'>
                    <img className='profileimg' src={comment.user['image']['png']} alt="" />
                    <span className='username'>{comment.user['username']}</span>
                    {comment.user['username'] === currentuser.username && <div className='you'>you</div>}
                    <span className='createddate'>{comment.createdAt}</span>
                    {comment.user['username'] !== currentuser.username && <button className="replybtn" onClick={()=>{showReplyform(comment.id)}} ><BsFillReplyFill/>Reply</button>}
                    {comment.user['username'] === currentuser.username && <div className="editstuff"><button onClick={()=>{removeComment(comment.id)}} className='delete'><AiFillDelete />Delete</button>
                    <button onClick={()=>{editComment(comment.id , comment.content)}} className='edit'><AiTwotoneEdit />Edit</button></div>}
                </div>
                < div className='text1' >
                    { editmode[0] === true && editmode[1] === comment.id  && <div className='editform'><textarea className='myinput' disabled={activate1} name="" id="" cols="30" value = {replycontent} onChange={(e) => {setReplycontent(e.target.value)}} rows="10" placeholder={'@'+comment.user['username']} ></textarea>  <button className='sendbtn'  disabled={activate1} onClick={() => {
                    if(replycontent.length>0){
                        update(comment.id)
                    }else{
                        console.log('you can not add empty reply')
                    }
                    }} >update</button> </div>}
                    {editmode[1] !== comment.id  && <p className='content'>{comment.content}</p>}
                </div>
            </div>
            {comment['showCommentReply']==true &&  <div   className="form">
                <img className='profileimg'  src={currentuser.image['png']} alt="" />
                <textarea className='myinput' disabled={activate1} name="" id="" cols="30" value = {replycontent} onChange={(e) => {setReplycontent(e.target.value)}} rows="10" placeholder={'@'+comment.user['username']} ></textarea>
                <button className='sendbtn'  disabled={activate1} onClick={() => {
                    if(replycontent.length>0){
                        addReply(comment.id , comment.user['username'])
                    }else{
                        console.log('you can not add empty reply')
                    }
                    }} >Reply</button>
            </div>}

            <div className='replies'>
            {comment.replies.map((reply)=> {
                return (
                    <Reply key={reply.id}  setActivate = {setActivate} reply = {reply} comments= {comments} setComments={setComments} comment={comment} currentuser={currentuser}/>
                )
            })}
            </div>
        </div>
  )
}

export default Comment
