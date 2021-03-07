import React, { useState } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonFab, IonFabButton, IonModal, IonButton} from '@ionic/react';
import './Suggest.css';
import '../theme/main.css';
import mainImage from '../images/download.jpeg';
import filterIcon from '../images/icons/filter-results-button.svg';

const Suggest: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage className="page__content">
    	<IonContent fullscreen className="page__content">
    		<IonSlides pager={true} options={slideOpts} className="slides">
    			<IonSlide>
					<img className="slide__image" src={mainImage}/>
					<div className="slide__info">

					</div>
          		</IonSlide>
				<IonSlide>
					<h1>Slide 2</h1>
				</IonSlide>
				<IonSlide>
            		<h1>Slide 3</h1>
          		</IonSlide>
        	</IonSlides>
			<IonFab vertical="bottom" horizontal="end" slot="fixed">
				<IonFabButton color="success" onClick={ () => setShowModal(true)}>
					<img src={filterIcon} className="action__icon"/>
				</IonFabButton>
        	</IonFab>
			<IonModal isOpen={showModal}>
				<p>This is modal content</p>
				<IonButton onClick={() => setShowModal(false)} color="success">Apply filters</IonButton>
			</IonModal>
      	</IonContent>
    </IonPage>
  );
};

export default Suggest;
