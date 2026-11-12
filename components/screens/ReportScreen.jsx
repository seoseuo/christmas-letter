'use client';
import { useState } from 'react';
export default function ReportScreen({go,Button}) {
 const [reason,setReason]=useState('');const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
 async function report(){const id=new URLSearchParams(location.search).get('id');if(!id){setMessage('신고할 편지가 없습니다.');return}setBusy(true);try{const r=await fetch('/api/letters/'+encodeURIComponent(id)+'/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason})});const d=await r.json();if(!r.ok)throw new Error(d.error);location.assign('/letters?reported=1')}catch(e){setMessage(e.message)}finally{setBusy(false)}}
 return <div className="content"><div className="page-heading"><h2>편지 신고하기</h2><p>신고하면 편지함에서 즉시 숨겨집니다.</p></div><div className="agreements">{['모욕 / 비방','협박','성적 불쾌감','개인정보 노출','기타'].map(item=><label key={item}><input type="radio" name="reason" checked={reason===item} onChange={()=>setReason(item)}/>{item}</label>)}</div>{message&&<div className="warning">{message}</div>}<Button disabled={!reason||busy} onClick={report}>신고 제출</Button><Button secondary onClick={()=>go('letters')}>취소</Button></div>;
}
