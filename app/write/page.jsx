import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/WriteScreen';

export default function Page() {
  return <ChristmasApp initialPage="write" Screen={Screen} />;
}
