import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/ReadScreen';

export default function Page() {
  return <ChristmasApp initialPage="read" Screen={Screen} />;
}
