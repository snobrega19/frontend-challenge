import { useDispatch } from "react-redux";
import { coordinatesActions } from "store/coordinates-slice";

function useCurrentPosition() {
  const dispatch = useDispatch();
  navigator.geolocation.getCurrentPosition((position) => {
    dispatch(
      coordinatesActions.setLatitudeAndLongitude({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );
  });
}
export default useCurrentPosition;
