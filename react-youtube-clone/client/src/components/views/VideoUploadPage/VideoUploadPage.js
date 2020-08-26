import React, { useState, useEffect } from 'react'
import { Typography,  Button, Form, message, Input, Icon, Spin, Space } from 'antd';
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import Axios from 'axios';
import { useSelector } from 'react-redux';




const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions =
[
    { value: 0, label: "Private"},
    { value: 1, label: "Public"}
]
const CategoryOptions =
[
    { value: 0, label: "a"},
    { value: 1, label: "b"},
    { value: 2, label: "c"}
]

const loading =
{
    margin: '2rem auto',
    maxWidth: '700px',
    minHeight: '500px',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'

}

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [File, setFile] = useState({name: "업로드할 파일 선택"});
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [FileDuration, setFileDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");
    const [isUploading, setisUploading] = useState(false);

    

    const OnTitleChange = (e) =>
    {
        setVideoTitle(e.target.value);
    }

    const OnDescriptionChange = (e) =>
    {
        setDescription(e.target.value);
    }

    const OnPrivateChange = (e) =>
    {
        setPrivate(e.target.value);
    }

    const OnCategoryChange = (e) =>
    {
        setCategory(e.target.value);
    }

    const OnDropHandler = (file, text) => {
       // setFile(file);
        let formData = new FormData;
        const config =
        {
            header: {'content-type': 'multipart/formdata'}
        }
        formData.append("file", file)


        Axios.post('/api/videos/uploadfiles', formData, config)
        .then(response =>
            {
                if(response)
                {
                    let variable =
                    {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.url);
                    //console.log(response)

                    Axios.post('/api/videos/thumbnails', variable)
                    .then(response =>
                        {
                            if(response.data.success)
                            {
                                setFileDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.url);

                                console.log(response.data);
                            }
                            else{
                                alert("썸네일 생성 실패");
                            }
                        })
                }
                else
                {
                    alert("비디오 업로드 실패");
                }
            })
        .catch(err => console.log(err))


        // var formData = new FormData(); // Currently empty
        // formData.append('username', 'Chris');
        // Axios.post('/api/videos/uploadfiles', formData, config)
        // .then(response =>
        //     {
        //         console.log(response);
        //     })
        // .catch(err => console.log(err));

        //console.log(formData);

        // console.log(data);

       //setFile(files);
        //console.log({ file: file, text: text});
       
    }
    useEffect(() => {
       //console.log(File.name);
    });
    const onSubmit = (e) =>
    {
        e.preventDefault();
        setisUploading(true);

        let variable = 
        {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: FileDuration,
            thumbnail: ThumbnailPath
        }

        Axios.post('/api/videos/uploadVideo', variable)
            .then(response =>
                {
                    if(response.data.success)
                    {
                        //console.log(response.data);
                        setisUploading(false);
                        message.success('업로드에 성공했습니다');

                        props.history.push('/');
                    }
                    else
                    {
                        alert("비디오 DB업로드 실패")
                    }
                })
    }

    return (
        <div>
        { isUploading ? 
            <div style={loading}>
                <Spin size="large" tip="업로드중..."/>
            </div>
        :
            <div style={{ maxWidth: '700px', margin: '2rem auto'}}> 
                <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                    <Title level={2}>Upload Video</Title>
                </div>

                const loading =





                <Form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}
                    >
                        


                        <StyledDropZone style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onDrop={OnDropHandler}>
                            {/* <Icon type="plus" style={{ fontSize: '3rem' }} 
                            /> */}
                            {File.name}

                        </StyledDropZone>

                            

                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"></img>
                        </div>
                    }
                        
                    </div>
                    <br />
                    <br />
                    <label>Title</label>
                    <Input
                        onChange={OnTitleChange}
                        value={VideoTitle}
                    />
                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea
                        onChange={OnDescriptionChange}
                        value={Description}
                    />
                    <br />
                    <br />
                    <select onChange={OnPrivateChange}>
                        {PrivateOptions.map((item, index ) =>
                            (
                                <option Key={index} value={item.value}>{item.label}</option>
                            ))}
                    </select>
                    <br />
                    <br />
                    <select onChange={OnCategoryChange}>
                        {CategoryOptions.map((item, index )=>
                            (
                                <option Key={index} value={item.value}>{item.label}</option>
                            ))}
                    </select>
                    <br />
                    <br />
                    <Button type="primary" size="large" onClick={onSubmit}>
                        업로드
                    </Button>


                </Form>
            </div>
            }
        </div>
    )
}

export default VideoUploadPage
