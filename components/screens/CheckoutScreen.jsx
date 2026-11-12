'use client';

export default function CheckoutScreen({ art, go, price, agree, setAgree, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button }) {
 return (<div className="content"><div className="page-heading"><div className="eyebrow">CHECKOUT PREVIEW</div><h2>결제 확인 🪙</h2><p>결제 화면 미리보기입니다.</p></div><div className="receipt"><div><span>상품</span><b>기다리지 않고 전부 열기</b></div><div><span>대상 양말</span><b>내 크리스마스 양말</b></div><div><span>결제 금액</span><b>{price[product]}</b></div><div><span>이용 기간</span><b>결제일 ~ 2027.01.15</b></div></div><div className="warning">본 상품은 결제 후 즉시 열람이 가능한 디지털 콘텐츠 이용권입니다. 열람이 시작되면 관련 법령에 따라 단순 변심으로 인한 청약철회가 제한될 수 있습니다. 단, 법령상 인정되는 환불 사유는 제외합니다.</div><Button disabled>결제하기 · 연동 준비 중</Button><Button secondary onClick={back}>돌아가기</Button></div>);
}
