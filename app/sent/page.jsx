import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/SentScreen';

export default function Page() {
  return <ChristmasApp initialPage="sent" Screen={Screen} />;
}
