import React, { useEffect, useState } from 'react'
import { Avatar, Col, List, Row, Spin} from 'antd';
import Axios from 'axios';
import styled from "styled-components";
import SideVideos from './Sections/SideVideos';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import { useSelector } from 'react-redux';
import LikeDisLikes from './Sections/LikeDisLikes';

const StyledDiv = styled.div`
 text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
  width: 100%;
  height: 100%;
`

function VideoDetailPage(props) {
    const user = useSelector(state => state.user);
    

    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId };
    const [videoDetail, setvideoDetail] = useState([]);
    const [comments, setcomments] = useState([])
    
    useEffect(() => {
        
        
        Axios.post('/api/videos/getVideoDetail', variable)
        .then(response =>
            {
                

                if(response.data.success)
                {   
                    //console.log(response.data.videoDetail);
                    setvideoDetail(response.data.videoDetail); 
                    
                }
                else
                {
                    alert("비디오 가져오는데 실패");
                }
            })
        Axios.post('/api/comment/getComments', variable)
        .then(response =>
            {
                if(response.data.success)
                {   
                    setcomments(response.data.comments); 
                }
                else
                {
                    alert("댓글 목록 가져오는데 실패");
                }
            })
        //console.log(videoId);
    }, [])

    useEffect(() => {

       
    }, [videoDetail])

    const refreshFunction = (newComment) => // 자식 함수에서 새로운 댓글정보 가져와 state에 추가한다
    {
        setcomments(comments.concat(newComment));

    }
    const subscribeButton = () =>
    {
        return <Subscribe userTo={videoDetail.writer}/>
    }

    
    
    return (

        
        
        <div>
            {console.log("--VideoDetailPage--")}
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem'}}>
                    {

                        videoDetail.writer && comments  && user.userData ? //서버에서 비디오 와 댓글 정보를 받아오면 출력
                        <div>
                            {console.log(user.userData)}
                            <video style={{ width: '100%'}} src={'http://localhost:5000/' + videoDetail.filePath} controls />
                            
                            <div>
                                {
                                videoDetail.writer._id !== user.userData._id 
                                ?
                                <List.Item
                                actions={[<LikeDisLikes userId={user.userData._id} videoId={videoId}/>, subscribeButton()]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={videoDetail.writer.image}/>}
                                    title={videoDetail.title}
                                    description={videoDetail.description}
                                    />

                                </List.Item> 
                                    :
                                <List.Item actions={[<LikeDisLikes userId={user.userData._id} videoId={videoId}/>]}>
                                        <List.Item.Meta
                                    avatar={<Avatar src={videoDetail.writer.image}/>}
                                    title={videoDetail.title}
                                    description={videoDetail.description}
                                    />

                                </List.Item> 
                            
                            }
                                
                                  

                                <Comment refreshFunction={refreshFunction} videoId={videoId} commentLists={comments} user={user.userData} />
                            </div>
                            
                                
                        </div>
                        : //서버에서 비디오 정보를 받아오기 전 로딩중
                        <div> 
                        
                            <StyledDiv>
                                <Spin size="large" tip="비디오 및 댓글정보를 불러오는중..."/>
                            </StyledDiv>
                        </div>
                        
        
                    }
                    </div>
                    
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideos>

                    </SideVideos>
                </Col>
            </Row>
            
        </div>
        
    )
}

export default VideoDetailPage
