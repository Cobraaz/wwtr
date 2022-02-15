import "./ScoresModal.component.css";

const ScoresModal = ({
  score,
  parameterId,
  optionNameId,
  handleClick,
  toggleSelect,
}) => {
  return (
    <div>
      <div className="AB-select-parent-score">
        <div className="d-flex align-self-center m-2">
          {score.map((sc, index) => (
            <div
              key={sc + index}
              onClick={() => {
                handleClick(parameterId, optionNameId, index + 1);
                toggleSelect(parameterId, optionNameId);
              }}
              className="AB-select-score m-1"
            >
              <button className="mt-2 AB-select-score-button btn">
                {index + 1}
              </button>
              <label className="mt-1 AB-select-score-paragraph p-1">{sc}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoresModal;
