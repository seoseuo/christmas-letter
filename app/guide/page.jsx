import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/GuideScreen';

export default function Page() {
  return <ChristmasApp initialPage="guide" Screen={Screen} />;
}
