import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenMoreReply, setOpenMoreReply] = useState(false)


    
     useEffect(() => {
        let numberOfComment=0;
        props.commentLists.map((comment, i) => 
        {
            return (
                comment.responseTo === props.parentCommentId && numberOfComment++
            )
        })
        setChildCommentNumber(numberOfComment);
        
    }, [props.commentLists])

    const replyComment = () => 
        props.commentLists.map((comment, i) => 
                {
                    if(comment.responseTo === props.parentCommentId)
                    {
                        return (
                            <div key={i}>
                                <div>----------------------</div>
                                <SingleComment refreshFunction={props.refreshFunction} comment={comment} writer={props.writer} videoId={props.videoId}/>
                                <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} comment={comment} writer={props.writer} videoId={props.videoId}/>
                            </div>
                        )
                    }
                })
       
    const ClickMoreReply = () =>
    {
        setOpenMoreReply(!OpenMoreReply)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <div style={{ width: '100%', marginLeft: '40px' }}>
                     <p style={{ fontSize: '10px', margin: 0, color: 'gray'}} onClick={ClickMoreReply}>
                         {ChildCommentNumber} ReplyComment
                    </p>
                    {OpenMoreReply &&
                        replyComment()
                    }
                    
                </div>
            
            }
             
        </div>
       

    )












    // const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    // const [OpenMoreReply, setOpenMoreReply] = useState(true)

    // useEffect(() => {
    //     let numberOfComment=0;
    //     console.log(props.commentLists)
    //     props.commentLists.map((comment, i) => 
    //     {
    //         //comment.responseTo === props.parentCommentId && console.log(comment)
    //         return (
    //             comment.responseTo === props.parentCommentId && numberOfComment++
    //         )
    //     })
    //     setChildCommentNumber(numberOfComment);
        
    // }, [])

    // useEffect(() => {
        
    // }, [ChildCommentNumber])

    
    // const ClickMoreReply = () =>
    // {
    //   //  console.log(OpenMoreReply)
    //     setOpenMoreReply(!OpenMoreReply)
    // }

    
    // const ReplyComment = () =>
    //     props.commentLists.map((comment, i) =>
    //     (

    //             comment.responseTo === props.parentCommentId &&
    //              (
    //                     <div>
                           
    //                         <SingleComment refreshFunction={props.refreshFunction} comment={comment} writer={props.writer} videoId={props.videoId}/>

    //                         {comment._id === comment.responseTo}
    //                         {/* <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} comment={comment} writer={props.writer} videoId={props.videoId}/> */}
    //                     </div>
    //              )
                
                

            
    //     ))

    
    

    // return (
    //     <div>
    //         {console.log("--ReplyComment--")}
    //         {ChildCommentNumber>0 && 
    //             <div style={{ width: '80%', marginLeft: '40px' }}>
    //                 <p style={{ fontSize: '10px', margin: 0, color: 'gray'}} onClick={ClickMoreReply}>
    //                     {ChildCommentNumber} 개의 댓글 보기
    //                 </p>
    //                 {OpenMoreReply &&
                        
    //                    ReplyComment()
                            
    //                 }

    //                 {/* {ReplyComment("asd")} */}
                    
                    
    //             </div>
    //         }
            
    //     </div>
    // )
}

export default ReplyComment
