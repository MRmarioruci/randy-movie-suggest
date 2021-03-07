import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Album.css';

const Album: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Album;
