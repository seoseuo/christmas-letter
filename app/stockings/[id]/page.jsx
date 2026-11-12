import ChristmasApp from '../../../components/ChristmasApp';
import Screen from '../../../components/screens/VisitScreen';

export default function Page() {
  return <ChristmasApp initialPage="visit" Screen={Screen} />;
}
