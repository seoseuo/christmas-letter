import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/LoginScreen';

export default function Page() {
  return <ChristmasApp initialPage="login" Screen={Screen} />;
}
