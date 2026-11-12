import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/HomeScreen';

export default function Page() {
  return <ChristmasApp initialPage="home" Screen={Screen} />;
}
