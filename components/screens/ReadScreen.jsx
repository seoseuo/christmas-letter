'use client';

export default function ReadScreen({ art, go, price, agree, setAgree, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button }) {
 return (<div className="content"><div className="page-heading"><div className="eyebrow">LETTER PREVIEW</div><h2>편지 읽기 ✉️</h2><p>예시로 작성된 편지입니다.</p></div><div className="guide-card"><b>보낸 사람　겨울별 ⭐</b><p><br/>안녕!<br/><br/>올해도 정말 수고 많았어.<br/>다가오는 크리스마스에는 마음이 따뜻해지는 시간이 되길 바라.<br/><br/>메리 크리스마스! 🎄</p></div><div className="button-row"><Button secondary onClick={()=>go('letters')}>목록으로</Button><Button secondary onClick={()=>go('report')}>신고 화면 보기</Button></div></div>);
}
