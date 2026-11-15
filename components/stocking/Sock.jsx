import { stockingAssets } from '../../lib/stocking-assets';
export default function Sock({ color=0, ribbon=0, bell=0, cord=0, small=false }) {
 return <div className={'sock-art '+(small?'small':'')} role="img" aria-label="꾸민 크리스마스 양말">
  <img className="sock-layer sock-base" src={stockingAssets[0][color]} alt="" />
  <img className="sock-layer sock-cord" src={stockingAssets[1][cord]} alt="" />
  <img className="sock-layer sock-ribbon" src={stockingAssets[2][ribbon]} alt="" />
  <img className="sock-layer sock-bell" src={stockingAssets[3][bell]} alt="" />
 </div>;
}
