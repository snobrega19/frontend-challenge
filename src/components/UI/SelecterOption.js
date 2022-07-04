import { components } from "react-select";
import { FaTrash } from "react-icons/fa";

export const styles = {
  option: (css) => ({
    ...css,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "3rem",
    span: { cursor: "pointer" },
    button: { cursor: "pointer" },
  }),
};

function Option({ children, innerProps, ...props }) {
  const { selectOption, selectProps, data } = props;
  const { deleteOption } = selectProps;
  const { onClick, ...newInnerProps } = innerProps;

  const clickWithoutSelect = (e, callback) => {
    callback(data);
    e.stopPropagation();
  };

  const events = {
    label: () => selectOption(data),
    delete: (e) => clickWithoutSelect(e, deleteOption),
  };

  return (
    <components.Option {...props} innerProps={newInnerProps}>
      <span onClick={events.label}>{children}</span>
      {!!props.isFocused && (
        <div>
          <button onClick={events.delete}>
            <FaTrash />
          </button>
        </div>
      )}
    </components.Option>
  );
}

export default Option;
