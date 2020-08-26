import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';


function LikeDisLikes(props) {
    const [Likes, setLikes] = useState("")
    const [DisLikes, setDisLikes] = useState("")
    const [Liked, setLiked] = useState(false)
    const [DisLiked, setDisLiked] = useState(false)


    const variable = () =>
        props.videoId ? { videoId: props.videoId, userId: props.userId } : { commentId: props.commentId, userId: props.userId  }
        


    useEffect(() => {

       // console.log(variable())

        Axios.post('/api/likes/getlikes', variable())
        .then(response =>
            {
                if(response.data.success)
                {
                    // if(response.data.likes)
                    //     console.log(response.data.likes.length)
                    if(response.data.likes)
                    {
                       // console.log(response.data.likes.length)
                         setLikes(response.data.likes.length)
                        // setLikes(33)
                         response.data.liked && setLiked(true)
                        // console.log("liked")
                         //console.log(response.data.liked)
                    }
                    
                }
                else
                {
                    alert('좋아요 정보 로드 실패')
                }
            })

        Axios.post('/api/likes/getdislikes', variable())
        .then(response =>
            {
                if(response.data.success)
                {
                    // if(response.data.dislikes)
                    //  console.log(response.data.dislikes)
                    if(response.data.dislikes)
                    {
                        //console.log(response.data.dislikes.length)
                        setDisLikes(response.data.dislikes.length)
                        response.data.disliked && setDisLiked(true)
                        //console.log("disliked")
                       // console.log(response.data.disliked)
                    }
                    
                }
                else
                {
                    alert('좋아요 정보 로드 실패')
                }
            })
        
    }, [])

    const onClickLikes = () =>
    {
        //console.log(props.userId)
        if(!props.userId)
            return alert("로그인이 필요합니다")
        if(DisLiked)
        {
            onClickDisLikes()
        }

        let variable = props.videoId ? { videoId: props.videoId, userId: props.userId, liked:  Liked } : 
                                    { commentId: props.commentId, userId: props.userId, liked:  Liked }
        // console.log("variable")
        // console.log(variable)
        Axios.post('/api/likes/clicklike', variable)
        .then(response =>
            {
                if(response.data.success)
                {
                    console.log(response.data)
                }
                else
                {
                    alert("좋아요 저장 실패")
                }
            })
        Liked ? setLikes(Likes - 1) : setLikes(Likes + 1)
        setLiked(!Liked)
        
    }
    const onClickDisLikes = () =>
    {
        //console.log(props.userId)
        if(!props.userId)
            return alert("로그인이 필요합니다")
        if(Liked)
        {
            onClickLikes();
        }

        let variable = props.videoId ? { videoId: props.videoId, userId: props.userId, disliked:  DisLiked } : 
                                    { commentId: props.commentId, userId: props.userId, disliked:  DisLiked }
        // console.log("variable")
        // console.log(variable)
        Axios.post('/api/likes/clickdislike', variable)
        .then(response =>
            {
                if(response.data.success)
                {
                    console.log(response.data)
                }
                else
                {
                    alert("싫어요 저장 실패")
                }
            })
        DisLiked ? setDisLikes(DisLikes - 1) : setDisLikes(DisLikes + 1)
        setDisLiked(!DisLiked)
        
    }
    return (
        <div>
           
            { 
            ( Likes >= 0 && DisLikes >= 0 ) &&
            <div>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        {Liked ?
                            <Icon type="like"
                            theme="filled"
                            onClick={onClickLikes} />
                            :
                            <Icon type="like"
                            theme="outlined"
                            onClick={onClickLikes} />
                        }
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
                </span>
                
                <span key="comment-basic-dislike">
                    <Tooltip title="DisLike">
                        {DisLiked ?
                            <Icon type="dislike"
                            theme="filled"
                            onClick={onClickDisLikes} />
                            :
                            <Icon type="dislike"
                            theme="outlined"
                            onClick={onClickDisLikes} />
                        }

                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DisLikes}</span>
                </span>
            </div>
            }  
        </div>
    )
}

export default LikeDisLikes
