import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/DecorateScreen';

export default function Page() {
  return <ChristmasApp initialPage="decorate" Screen={Screen} />;
}
