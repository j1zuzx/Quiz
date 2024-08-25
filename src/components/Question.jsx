import PropTypes from 'prop-types';

export default function Question({ question, options, onAnswer }) {
Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onAnswer: PropTypes.func.isRequired,
};
  return (
    <div>
      <h2>{question}</h2>
      {options.map(function (option) {
        return (
          <button
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
