import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {

    const [subscribeNumber, setsubscribeNumber] = useState(0)
    const [subscribed, setsubscribed] = useState(false)
    useEffect(() => {

        let subvariable =
        {
            userTo: props.userTo,
            userFrom: localStorage.getItem('userId')
        }

        Axios.post('/api/subscribe/subscribed', subvariable)
        .then(response =>
            {
                if(response.data.success)
                {
                    setsubscribed(response.data.subscribed);
                }
                else
                {
                    alert("구독여부 정보 로드 실패");
                }
            })


        let variable =
        {
            userTo: props.userTo
        }
        
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response =>
            {
                if(response.data.success)
                {
                    setsubscribeNumber(response.data.subscribeNumber);
                }
                else
                {
                    alert("구독자 수 정보 로드 실패");
                }
            })

        



    }, [])

    const ClickSubscribeButton = () =>
    {
        let variable =
        {
            userTo: props.userTo,
            userFrom: localStorage.getItem('userId')
        }

        
        if(subscribed)
        {
            Axios.post('/api/subscribe/unsubscribe', variable)
            .then(response =>
                {
                    if(response.data.success)
                    {
                        setsubscribed(false);
                    }
                    else
                    {
                        alert("구독여부 정보 로드 실패");
                    }
                })
        }
        else
        {
            Axios.post('/api/subscribe/subscribe', variable)
            .then(response =>
                {
                    if(response.data.success)
                    {
                        setsubscribed(true);
                    }
                    else
                    {
                        alert("구독여부 정보 로드 실패");
                    }
                })
        }
        
    }
    return (
        <div>
            <button
                style={{ backgroundColor: '#CC0000', borderRadius: '4px',
            color: 'white', padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
            onClick={ClickSubscribeButton}
            
            >
               {subscribed ? 'Subscribed': 'Subscribe'} 
            </button>
            </div>
    )
}

export default Subscribe
