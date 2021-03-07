import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Account.css';

const Account: React.FC = () => {
  return (
	<IonPage>
		<IonContent fullscreen>
			<ExploreContainer name="Account page" />
		</IonContent>
	</IonPage>
  );
};

export default Account;
