import { readFileSync } from 'node:fs';
import path from 'node:path';
import Footer from '../Footer';
import { BackButton } from './LegalNavigation';

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
}

function parseDocument(source) {
  const blocks = [];
  for (const raw of source.trim().split(/\n\s*\n/)) {
    const lines = raw.split('\n');
    const heading = lines[0].match(/^(#{1,6})\s+(.+)$/);
    if (heading && lines.length === 1) blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
    else if (/^---\s*$/.test(raw)) blocks.push({ type: 'rule' });
    else if (lines.every(line => /^\d+\.\s/.test(line))) blocks.push({ type: 'ordered', items: lines.map(line => line.replace(/^\d+\.\s/, '')) });
    else if (lines.every(line => /^-\s/.test(line))) blocks.push({ type: 'unordered', items: lines.map(line => line.replace(/^-\s/, '')) });
    else blocks.push({ type: 'paragraph', text: lines.join(' ') });
  }
  return blocks;
}

export default function LegalDocument({ filename }) {
  const blocks = parseDocument(readFileSync(path.join(process.cwd(), filename), 'utf8'));
  const sections = blocks.map((block, index) => ({ ...block, index })).filter(block => block.type === 'heading' && block.level > 1);
  return <div className="desktop"><div className="desktop-copy"><span>✦ ANDFLOW STUDIO ✦</span><h1>마음을 담아,<br/>크리스마스에 만나요.</h1><p>소중한 사람들과 주고받는<br/>작고 따뜻한 크리스마스 선물</p><div className="desktop-stars">✳　✦　❄</div></div><div className="phone legal-phone" id="top">
    <header><a className="brand legal-brand" href="/">🧦 <span>크리스마스 양말에 편지를 담아요</span></a></header>
    <main className="content legal-content"><BackButton />
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Tag = `h${block.level === 1 ? 1 : 2}`;
          return <Tag id={block.level > 1 ? `section-${index}` : undefined} key={index}>{inline(block.text)}</Tag>;
        }
        if (block.type === 'rule') return <hr key={index} />;
        if (block.type === 'ordered' || block.type === 'unordered') {
          const Tag = block.type === 'ordered' ? 'ol' : 'ul';
          return <Tag key={index}>{block.items.map((item, i) => <li key={i}>{inline(item)}</li>)}</Tag>;
        }
        return <p key={index}>{inline(block.text)}</p>;
      }).reduce((result, item, index) => {
        result.push(item);
        if (index === 1) result.push(<nav className="legal-toc" aria-label="목차" key="toc"><h2>목차</h2><ol>{sections.map(section => <li key={section.index}><a href={`#section-${section.index}`}>{section.text}</a></li>)}</ol></nav>);
        return result;
      }, [])}
      <div className="legal-contact">✦ andflow studio<br/><a href="https://instagram.com/andflow.studio">Instagram @andflow.studio ↗</a></div>
      <a className="legal-top" href="#top">↑ 최상단으로</a>
    </main><Footer />
  </div></div>;
}
