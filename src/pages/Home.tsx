import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { useContext } from "react";
import { GalleryContext } from "../helpers/galleryContext";

import useWeather from "../helpers/useWeather";

const Home: React.FC = () => {
  const { weather, loading, refetch } = useWeather();
  const { lastPic, takePhoto } = useContext(GalleryContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <div style={{ height: "100px" }}>
            {loading ? (
              <IonSkeletonText
                animated={true}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                height="100px"
                style={{ display: "block", margin: "auto" }}
                alt="Weather"
                src={`https:${weather?.current.condition.icon}`}
              />
            )}
          </div>
          <IonCardHeader>
            <IonCardTitle>{weather?.current.condition.text}</IonCardTitle>
            <IonCardSubtitle>{weather?.current.temp_c}°C</IonCardSubtitle>
            <IonCardContent>{new Date().toDateString()}</IonCardContent>
          </IonCardHeader>
        </IonCard>
        <div className="ion-text-right">
          <IonButton onClick={refetch}>Refech</IonButton>
        </div>

        {lastPic && (
          <IonImg style={{ marginTop: "50px" }} src={lastPic.webviewPath} />
        )}

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={cameraOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
