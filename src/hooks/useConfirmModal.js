import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "store/weather-slice";
import { statusActions } from "store/status-slice";
import { citiesActions } from "store/cities-slice";
function useConfirmModal() {
  const dispatch = useDispatch();
  const { clearAll, dataToDelete } = useSelector((state) => state.status.modal);
  function confirmClickHandler() {
    if (clearAll) {
      dispatch(citiesActions.resetStore());
    } else {
      dispatch(citiesActions.removeCityFromList(dataToDelete.value));
      dispatch(weatherActions.setCity(null));
    }
    dispatch(weatherActions.clearLatitudeAndLongitude());
    dispatch(statusActions.setModalProps({ showModal: false }));
  }
  return { confirmClickHandler };
}

export default useConfirmModal;
