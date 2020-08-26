import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDisLikes from './LikeDisLikes';


const { TextArea } = Input;

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [commentValue, setcommentValue] = useState("")

    const onClickReplyOpen = () =>
    {

        setcommentValue("");
        setOpenReply(!OpenReply);
    }
    const onChangeHandler = (e) =>
    {
        setcommentValue(e.target.value);
    }
    const onSubmit = (event) =>
    {
        event.preventDefault();

        const variable =
        {
            content: commentValue,
            writer: props.writer,
            postId: props.videoId,
            responseTo: props.comment._id
        }


        Axios.post('/api/comment/saveComment', variable)
        .then(response =>
            {
                if(response.data.success)
                {
                   // console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                    setcommentValue("");
                }
                else
                {

                }
            })

    }

    const actions = [
        <LikeDisLikes userId={props.writer} commentId={props.comment._id} />
       , <span onClick={onClickReplyOpen} key="comment-basic-reply-to">댓글 쓰기</span>
    ]
    return (
        <div>
            {console.log("--SingleComment--")}
            {/* {console.log(props.comment)} */}
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} />}
                content={ <p> {props.comment.content} </p> }
            />
            {OpenReply && 
            <form style={{ display: 'flex'}} onSubmit={onSubmit}>
            <textarea
                style={{  width: '100'+'%', marginLeft: '40px' , borderRadius: '5px'}}
                onChange={onChangeHandler}
                value={commentValue}
                placeholder="댓글을 작성하세요"
                />
            <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>저장</button>
          </form>
            }
            
        </div>
    )
}

export default SingleComment
