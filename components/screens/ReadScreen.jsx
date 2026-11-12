'use client';
import { useEffect, useState } from 'react';
export default function ReadScreen({go,Button}) {
 const [letter,setLetter]=useState(null);const [message,setMessage]=useState('편지를 불러오고 있어요.');
 useEffect(()=>{const id=new URLSearchParams(location.search).get('id');if(!id){setMessage('읽을 편지를 선택해 주세요.');return}fetch('/api/letters/'+encodeURIComponent(id)).then(async r=>{const data=await r.json();if(!r.ok)throw new Error(data.error);setLetter(data.letter)}).catch(e=>setMessage(e.message));},[]);
 return <div className="content"><div className="page-heading"><h2>편지 읽기 ✉️</h2></div>{letter?<><div className="guide-card"><b>보낸 사람　{letter.writer}</b><p style={{whiteSpace:'pre-wrap'}}>{'\n'+letter.body}</p></div><Button secondary onClick={()=>location.assign('/report?id='+encodeURIComponent(letter.id))}>신고하기</Button></>:<div className="info">{message}</div>}<Button secondary onClick={()=>go('letters')}>목록으로</Button></div>;
}
