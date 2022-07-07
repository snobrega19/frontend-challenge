import { useEffect } from "react";
import { weatherActions } from "store/weather-slice";
import { useDispatch } from "react-redux";

function useCurrentPosition() {
  const dispatch = useDispatch();
  useEffect(() => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    geolocation.getCurrentPosition((position) => {
      dispatch(
        weatherActions.setLatitudeAndLongitude({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    });
  }, []);
}
export default useCurrentPosition;
