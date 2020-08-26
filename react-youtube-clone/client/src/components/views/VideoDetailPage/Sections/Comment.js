import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const [commentValue, setcommentValue] = useState("")
    //const [user, setuser] = useState(useSelector(state => state.user))
    
    const videoId = props.videoId;

    

    useEffect(() => {
        
        
    }, [])

    

    const handleChange = (event) =>
    {
        setcommentValue(event.target.value);
    }
    const onSubmit = (event) =>
    {
        event.preventDefault();
        setcommentValue("");
        const variable =
        {
            content: commentValue,
            writer: props.user._id,
            postId: videoId
        }

       // console.log(writer);

        Axios.post('/api/comment/saveComment', variable)
        .then(response =>
            {
                if(response.data.success)
                {
                   // console.log(response.data.result)
                   props.refreshFunction(response.data.result);
                }
                else
                {
                    alert("댓글 저장 실패")
                }
            })

    }

    return (
        <div>
            {console.log("--comment--")}
            <br />
            <p>댓글 목록</p>          
            <br />

              {/* 댓글 목록 */}

            








              {props.commentLists.map((comment, i) =>
                  (!comment.responseTo && 
                        <div key={i}>
                           
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} writer={props.user._id} videoId={videoId}/>
                            <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} comment={comment} writer={props.user._id} videoId={videoId}/>
                        </div>
                  )
                )}




              
              {/* 댓글 저장 폼 */}
              <br />
                <p>댓글 쓰기</p>          
                <br />
              <form style={{ display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={commentValue}
                    placeholder="댓글을 작성하세요"
                    />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>저장</button>
              </form>
        </div>
    )
}

export default Comment
