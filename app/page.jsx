import ChristmasApp from '../components/ChristmasApp';
import Screen from '../components/screens/IntroScreen';

export default function Page() {
  return <ChristmasApp initialPage="intro" Screen={Screen} />;
}
