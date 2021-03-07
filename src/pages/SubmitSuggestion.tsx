import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Suggest.css';

const SubmitSuggestion: React.FC = () => {
  return (
    <IonPage>
=      <IonContent fullscreen>
        <ExploreContainer name="Tab 4 page" />
      </IonContent>
    </IonPage>
  );
};

export default SubmitSuggestion;
