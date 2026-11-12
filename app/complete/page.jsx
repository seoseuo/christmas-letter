import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/CompleteScreen';

export default function Page() {
  return <ChristmasApp initialPage="complete" Screen={Screen} />;
}
