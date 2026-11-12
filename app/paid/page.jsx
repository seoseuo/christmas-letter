import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/PaidScreen';

export default function Page() {
  return <ChristmasApp initialPage="paid" Screen={Screen} />;
}
