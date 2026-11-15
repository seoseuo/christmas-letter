'use client';

import React, { useState } from 'react';

import Sock from './stocking/Sock';
import { colors, papers, price } from '../lib/service-config';
import { screenPaths } from '../lib/routes';

export default function ChristmasApp({ initialPage = 'intro', Screen, testLoginEnabled = false }){
 const [origin,setOrigin]=useState('');
 const [page,setPage]=useState(initialPage); const [name,setName]=useState(''); const [saved,setSaved]=useState(false); const [opts,setOpts]=useState([0,0,0,0]); const [paper,setPaper]=useState(0); const [writer,setWriter]=useState(''); const [message,setMessage]=useState(''); const [product,setProduct]=useState('all'); const [reason,setReason]=useState(''); const [modal,setModal]=useState(''); const [toast,setToast]=useState('');
 const [loginTarget,setLoginTarget]=useState(''); const [stockingId,setStockingId]=useState(''); const [letterCount,setLetterCount]=useState(0); const [busy,setBusy]=useState(false);
 React.useEffect(()=>{
  setOrigin(window.location.origin);
  if(initialPage==='login' && new URLSearchParams(window.location.search).get('error')==='auth') flash('로그인에 실패했어요. 서버 로그를 확인해 주세요.');
  try {
   const data=JSON.parse(sessionStorage.getItem('christmas-preview') || '{}');
   if(typeof data.name==='string')setName(data.name);
   if(typeof data.stockingId==='string')setStockingId(data.stockingId);
   if(typeof data.saved==='boolean')setSaved(data.saved);
   if(Array.isArray(data.opts))setOpts(data.opts);
   if(Number.isInteger(data.paper))setPaper(data.paper);
   if(typeof data.writer==='string')setWriter(data.writer);
   if(typeof data.message==='string')setMessage(data.message);
   if(typeof data.product==='string')setProduct(data.product);
   if(typeof data.loginTarget==='string')setLoginTarget(data.loginTarget);
  } catch { /* An unavailable session store does not prevent navigation. */ }
 },[]);
 React.useEffect(()=>{
  if(initialPage==='visit'){const id=window.location.pathname.split('/').pop();setStockingId(id);try {const data=JSON.parse(sessionStorage.getItem('christmas-preview')||'{}');sessionStorage.setItem('christmas-preview',JSON.stringify({...data,stockingId:id}));} catch {} fetch(`/api/stockings/${encodeURIComponent(id)}`).then(async r=>{if(!r.ok)throw new Error();return r.json()}).then(({stocking})=>{setName(stocking.nickname);setOpts(stocking.options)}).catch(()=>flash('양말을 불러올 수 없어요.'));}
  if(['home','letters','complete'].includes(initialPage)){fetch('/api/stockings').then(async r=>{if(!r.ok)throw new Error();return r.json()}).then(({stocking})=>{if(!stocking){if(initialPage==='home')window.location.replace('/decorate');return}setSaved(true);setStockingId(stocking.id);setName(stocking.nickname);setOpts(stocking.options);setLetterCount(stocking.letter_count)}).catch(()=>flash('로그인 또는 서버 설정을 확인해 주세요.'));}
 },[initialPage]);
 const go=(p, overrides={})=>{
  try { sessionStorage.setItem('christmas-preview',JSON.stringify({name,saved,opts,paper,writer,message,product,loginTarget,stockingId,...overrides})); } catch {}
  window.location.assign(p === 'visit' && stockingId ? '/stockings/' + encodeURIComponent(stockingId) : (screenPaths[p] || '/'));
 };
 const back=()=>{if(window.history.length>1)window.history.back();else go(initialPage==='visit'?'intro':'home')};
 const flash=(t)=>{setToast(t);setTimeout(()=>setToast(''),2600)}; const copy=async()=>{try{await navigator.clipboard.writeText(location.origin+'/stockings/'+stockingId);flash('공유 링크를 복사했어요!')}catch{flash('주소창의 링크를 복사해 주세요.')}}; const title=name||'소중한 친구'; const art=<Sock color={opts[0]} cord={opts[1]} ribbon={opts[2]} bell={opts[3]}/>;
 const Button=({children,onClick,secondary=false,disabled=false})=><button className={'button '+(secondary?'secondary':'')} onClick={onClick} disabled={disabled}>{children}</button>;
 const share=()=>navigator.share?navigator.share({title:'크리스마스 양말에 편지를 담아요',text:`${title}의 양말에 편지를 남겨주세요!`,url:location.origin+'/stockings/'+stockingId}).catch(()=>{}):copy();
 return <div className="desktop"><div className="desktop-copy"><span>✦ ANDFLOW STUDIO ✦</span><h1>마음을 담아,<br/>크리스마스에 만나요.</h1><p>소중한 사람들과 주고받는<br/>작고 따뜻한 크리스마스 선물</p><div className="desktop-stars">✳　✦　❄</div></div><div className="phone"><header><button className="brand" onClick={()=>go(saved?'home':'intro')}>🧦 <span>크리스마스 양말에 편지를 담아요</span></button><button className="guide-btn" onClick={()=>go('guide')}>이용 안내</button></header><main key={page}>
 <Screen {...{ art, go, price, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button, testLoginEnabled }} />














 </main><footer>© andflow studio</footer></div>{modal&&<div className="overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal"><div className="big-icon">🧦</div><h2 id="modal-title">이 양말로 결정할까요?</h2><p>한 번 완성한 양말은<br/>다시 수정할 수 없어요.</p><Button onClick={async()=>{setBusy(true);try{const r=await fetch('/api/stockings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nickname:name,options:opts})});const data=await r.json();if(!r.ok)throw new Error(data.error);setModal('');go('complete',{saved:true,stockingId:data.stocking.id})}catch(e){flash(e.message||'저장하지 못했어요.')}finally{setBusy(false)}}} disabled={busy}>네, 완성할게요!</Button><Button secondary onClick={()=>setModal('')}>조금 더 꾸밀래요</Button></div></div>}{toast&&<div className="toast" role="status">{toast}</div>}</div>
}
