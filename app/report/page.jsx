import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/ReportScreen';

export default function Page() {
  return <ChristmasApp initialPage="report" Screen={Screen} />;
}
