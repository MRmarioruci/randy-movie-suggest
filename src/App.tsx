import { Redirect, Route } from 'react-router-dom';
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albums, add, shuffle, person } from 'ionicons/icons';
import Suggest from './pages/Suggest';
import Album from './pages/Album';
import SubmitSuggestion from './pages/SubmitSuggestion';
import Account from './pages/Account';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tabs.css';
import './theme/main.css';

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/suggest">
						<Suggest />
					</Route>
					<Route exact path="/album">
						<Album />
					</Route>
					<Route path="/submit">
						<SubmitSuggestion />
					</Route>
					<Route path="/account">
						<Account />
					</Route>
					<Route exact path="/">
						<Redirect to="/suggest" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom" className="tabs">
					<IonTabButton tab="suggest" href="/suggest">
						<IonIcon icon={shuffle} />
						<IonLabel>Find</IonLabel>
					</IonTabButton>
					<IonTabButton tab="album" href="/album">
						<IonIcon icon={albums} />
						<IonLabel>My list</IonLabel>
					</IonTabButton>
					<IonTabButton tab="submit" href="/submit">
						<IonIcon icon={add} />
						<IonLabel>Add</IonLabel>
					</IonTabButton>
					<IonTabButton tab="account" href="/account">
						<IonIcon icon={person} />
						<IonLabel>Me</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
