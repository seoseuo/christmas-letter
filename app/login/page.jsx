import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/LoginScreen';

export default function Page() {
  return <ChristmasApp initialPage="login" Screen={Screen} testLoginEnabled={process.env.NODE_ENV === 'development' && process.env.ENABLE_TEST_LOGIN === 'true'} />;
}
